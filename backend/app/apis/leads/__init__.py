from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import io
import databutton as db
import uuid
import json
import re

router = APIRouter()

class Lead(BaseModel):
    id: str
    company_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    industry: Optional[str] = None
    location: Optional[str] = None
    capital: Optional[str] = None
    score: Optional[int] = None
    website: Optional[str] = None
    status: str = "new"
    created_at: str

class LeadList(BaseModel):
    leads: List[Lead]

def sanitize_storage_key(key: str) -> str:
    """Sanitize storage key to only allow alphanumeric and ._- symbols"""
    return re.sub(r'[^a-zA-Z0-9._-]', '', key)

def save_leads(leads):
    """
    Save leads to storage
    """
    try:
        # Convert to dict for storage
        leads_dict = {lead.id: lead.dict() for lead in leads}
        
        # Save to storage
        db.storage.json.put(sanitize_storage_key("leads"), leads_dict)
        return True
    except Exception as e:
        print(f"Error saving leads: {e}")
        return False

def get_leads():
    """
    Get all leads from storage
    """
    try:
        leads_dict = db.storage.json.get("leads", default={})
        leads = [Lead(**lead_data) for lead_id, lead_data in leads_dict.items()]
        return leads
    except Exception as e:
        print(f"Error getting leads: {e}")
        return []

@router.post("/api/leads/upload")
async def upload_csv(file: UploadFile = File(...)):
    """
    Upload a CSV file with company leads
    """
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="File must be a CSV")
    
    try:
        # Read the uploaded file
        contents = await file.read()
        
        # Convert to pandas DataFrame
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
        
        # Process the DataFrame to extract lead information
        leads = []
        for _, row in df.iterrows():
            lead_id = str(uuid.uuid4())
            import datetime
            created_at = datetime.datetime.now().isoformat()
            
            # Map CSV columns to Lead model fields
            # Note: Column names might differ based on the user's CSV structure
            lead = Lead(
                id=lead_id,
                company_name=row.get('company_name', row.get('Company Name', row.get('name', 'Unknown'))),
                email=row.get('email', row.get('Email', None)),
                phone=row.get('phone', row.get('Phone', row.get('contact', None))),
                industry=row.get('industry', row.get('Industry', None)),
                location=row.get('location', row.get('Location', row.get('address', None))),
                capital=row.get('capital', row.get('Capital', None)),
                website=row.get('website', row.get('Website', None)),
                score=None,  # Will be calculated later with AI
                status="new",
                created_at=created_at
            )
            leads.append(lead)
        
        # Save the leads to storage
        success = save_leads(leads)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to save leads")
        
        return {"message": f"Successfully uploaded {len(leads)} leads", "count": len(leads)}
        
    except pd.errors.EmptyDataError:
        raise HTTPException(status_code=400, detail="The CSV file is empty")
    except pd.errors.ParserError:
        raise HTTPException(status_code=400, detail="Unable to parse the CSV file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@router.get("/api/leads")
async def get_all_leads():
    """
    Get all leads
    """
    leads = get_leads()
    return LeadList(leads=leads)
