// Utility file to generate fake data for development and demo purposes
// Create our own fake data generator since we don't have direct access to faker library
// Create a simple UUID generator function
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16) ;
  });
}

// Simple faker replacement
const faker = {
  company: {
    name: () => ['Techlify', 'CodeCraft', 'DevStream', 'DataZen', 'CloudPeak', 'ByteForge', 'PixelPulse', 'NetMatrix', 'LogicLeap', 'InnovateTech'][Math.floor(Math.random() * 10)]
  },
  internet: {
    email: () => `contact@${faker.company.name().toLowerCase().replace(' ', '')}.com`,
    url: () => `https://www.${faker.company.name().toLowerCase().replace(' ', '')}.com`,
    domainName: () => `${faker.company.name().toLowerCase().replace(' ', '')}.com`
  },
  phone: {
    number: () => `+1-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`
  },
  helpers: {
    arrayElement: (array) => array[Math.floor(Math.random() * array.length)]
  },
  location: {
    city: () => ['New York', 'San Francisco', 'Chicago', 'Los Angeles', 'Seattle', 'Boston', 'Austin', 'Denver', 'Miami', 'Portland'][Math.floor(Math.random() * 10)],
    country: () => ['USA', 'Canada', 'UK', 'Germany', 'France', 'Australia', 'Japan', 'Singapore', 'India', 'Brazil'][Math.floor(Math.random() * 10)]
  },
  number: {
    int: ({ min, max }) => Math.floor(Math.random() * (max - min + 1)) + min
  },
  date: {
    recent: (options = { days: 7 }) => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * options.days));
      return date;
    }
  },
  lorem: {
    sentence: (words = 5) => {
      const wordList = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'];
      let result = '';
      for (let i = 0; i < words; i++) {
        result += wordList[Math.floor(Math.random() * wordList.length)] + ' ';
      }
      return result.trim() + '.';
    },
    paragraph: () => {
      let result = '';
      for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) {
        result += faker.lorem.sentence() + ' ';
      }
      return result.trim();
    },
    sentences: (count = 2) => {
      let result = '';
      for (let i = 0; i < count; i++) {
        result += faker.lorem.sentence() + ' ';
      }
      return result.trim();
    }
  },
  person: {
    fullName: () => {
      const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa', 'William', 'Jessica'];
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'];
      return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    },
    jobTitle: () => ['CEO', 'CTO', 'CFO', 'COO', 'Director', 'VP of Engineering', 'Product Manager', 'HR Manager', 'Marketing Director', 'Sales Manager'][Math.floor(Math.random() * 10)]
  },
  datatype: {
    boolean: () => Math.random() > 0.5
  }
};

// Generate a random date within the past few months
const getRandomDate = (daysBack = 90) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date;
};

// Random industry options
const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Manufacturing",
  "Real Estate",
  "Consulting",
  "Entertainment",
  "Retail"
];

// Random locations
const locations = [
  "New York, USA",
  "San Francisco, USA",
  "London, UK",
  "Berlin, Germany",
  "Toronto, Canada",
  "Sydney, Australia",
  "Singapore",
  "Tokyo, Japan",
  "Paris, France",
  "Amsterdam, Netherlands"
];

// Generate a random lead score
const getRandomScore = () => {
  return Math.floor(Math.random() * 100);
};

// Generate a list of fake leads
export function generateFakeLeads(count: number) {
  return Array.from({ length: count }).map(() => ({
    id: uuidv4(),
    company_name: `${faker.company.name()}`,
    email: faker.internet.email(),
    phone: faker.phone.number(),
    industry: faker.helpers.arrayElement([
      "Software",
      "Finance",
      "Healthcare",
      "Manufacturing",
      "Retail",
      "Education",
      "Marketing",
    ]),
    location: `${faker.location.city()}, ${faker.location.country()}`,
    capital: faker.helpers.arrayElement(["< $1M", "$1-10M", "$10-50M", "$50-100M", "> $100M"]),
    score: faker.helpers.arrayElement([null, ...Array.from({ length: 10 }).map(() => faker.number.int({ min: 10, max: 95 }))]),
    website: faker.internet.url(),
    status: faker.helpers.arrayElement(["new", "contacted", "qualified", "disqualified"]),
    created_at: faker.date.recent().toISOString(),
  }));
}

// Generate call history data for dashboard
export const generateCallHistory = (days = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      successful: Math.floor(Math.random() * 8) + 2,
      unsuccessful: Math.floor(Math.random() * 5) + 1,
      total: 0,  // Will be calculated
    });
    
    // Calculate total
    data[i].total = data[i].successful + data[i].unsuccessful;
  }
  
  return data.reverse();
};

// Generate email engagement analytics
export const generateEmailAnalytics = () => {
  // Total emails sent in the period
  const totalSent = Math.floor(Math.random() * 300) + 200;
  
  // Calculate percentages for different engagement metrics
  const openRate = Math.round((Math.random() * 30) + 60);  // 60-90%
  const replyRate = Math.round((Math.random() * 20) + 20);  // 20-40%
  const clickRate = Math.round((Math.random() * 25) + 35);  // 35-60%
  
  // Calculate actual numbers
  const opened = Math.round((totalSent * openRate) / 100);
  const replied = Math.round((totalSent * replyRate) / 100);
  const clicked = Math.round((totalSent * clickRate) / 100);
  
  return {
    totalSent,
    opened,
    openRate,
    replied,
    replyRate,
    clicked,
    clickRate,
    weekly: [
      { name: 'Mon', sent: Math.floor(Math.random() * 40) + 20, opened: Math.floor(Math.random() * 30) + 15 },
      { name: 'Tue', sent: Math.floor(Math.random() * 40) + 30, opened: Math.floor(Math.random() * 35) + 20 },
      { name: 'Wed', sent: Math.floor(Math.random() * 50) + 40, opened: Math.floor(Math.random() * 40) + 30 },
      { name: 'Thu', sent: Math.floor(Math.random() * 45) + 35, opened: Math.floor(Math.random() * 35) + 25 },
      { name: 'Fri', sent: Math.floor(Math.random() * 35) + 25, opened: Math.floor(Math.random() * 25) + 15 },
      { name: 'Sat', sent: Math.floor(Math.random() * 20) + 10, opened: Math.floor(Math.random() * 15) + 5 },
      { name: 'Sun', sent: Math.floor(Math.random() * 15) + 5, opened: Math.floor(Math.random() * 10) + 3 },
    ]
  };
};

// Generate top performing leads
export const generateTopLeads = (count = 5) => {
  return generateFakeLeads(count).map(lead => ({
    ...lead,
    score: 80 + Math.floor(Math.random() * 20), // Ensure high scores for top leads (80-100)
    engagementRate: `${70 + Math.floor(Math.random() * 30)}%`, // High engagement rates
    lastContact: getRandomDate(14).toISOString(), // Recently contacted
  }));
};

// Generate fake engagement data
export function generateFakeLeadDetails(leadId: string) {
  // Generate fake company details
  const company = {
    id: leadId,
    name: faker.company.name(),
    website: faker.internet.domainName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    industry: faker.helpers.arrayElement(["Software", "Finance", "Healthcare", "Manufacturing", "Retail"]),
    location: `${faker.location.city()}, ${faker.location.country()}`,
    capital: faker.helpers.arrayElement(["< $1M", "$1-10M", "$10-50M", "$50-100M", "> $100M"]),
    score: faker.number.int({ min: 25, max: 95 }),
    status: faker.helpers.arrayElement(["new", "contacted", "qualified", "disqualified"]),
  };
  
  // Generate fake contacts
  const contacts = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
    name: faker.person.fullName(),
    title: faker.person.jobTitle(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
  }));
  
  // Generate fake call history
  const calls = Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => {
    const date = faker.date.recent({ days: 30 });
    return {
      title: faker.helpers.arrayElement([
        "Initial Outreach Call",
        "Product Demo",
        "Follow-up Discussion",
        "Requirements Gathering",
        "Decision Maker Meeting"
      ]),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      duration: faker.number.int({ min: 5, max: 45 }),
      sentiment: faker.helpers.arrayElement(["positive", "neutral", "negative"]),
      summary: faker.lorem.paragraph(),
      keyPoints: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => 
        faker.lorem.sentence()
      ),
      actionItems: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() => {
        const completed = faker.datatype.boolean();
        return {
          text: faker.lorem.sentence(),
          completed,
          completedDate: completed ? faker.date.recent().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null
        };
      })
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Generate fake email communication
  const emails = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => {
    const type = faker.helpers.arrayElement(['sent', 'received']);
    const date = faker.date.recent({ days: 30 });
    const status = type === 'sent' ? faker.helpers.arrayElement(['Delivered', 'Opened', 'Clicked', 'Replied', null]) : null;
    
    let metrics = null;
    if (type === 'sent' && status) {
      metrics = {
        'Opened': `${faker.number.int({ min: 1, max: 5 })} times`,
        'Time spent': `${faker.number.int({ min: 10, max: 300 })}s`,
      };
      if (status === 'Clicked' || status === 'Replied') {
        metrics['Clicked'] = `${faker.number.int({ min: 1, max: 3 })} links`;
      }
    }
    
    return {
      type,
      subject: faker.lorem.sentence(4),
      preview: faker.lorem.paragraph(),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      status,
      metrics
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return {
    company,
    contacts,
    calls,
    emails
  };
}

export const generateFakeEngagementData = () => {
  return {
    summary: {
      responseRate: Math.floor(Math.random() * 25) + 25,
      responseRateChange: Math.floor(Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1),
      avgCallScore: Math.floor(Math.random() * 3) + 7,
      avgCallScoreChange: Math.floor(Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1),
      emailOpenRate: Math.floor(Math.random() * 30) + 45,
      emailOpenRateChange: Math.floor(Math.random() * 15) * (Math.random() > 0.5 ? 1 : -1),
      avgResponseTime: Math.floor(Math.random() * 24) + 12,
      avgResponseTimeChange: Math.floor(Math.random() * 6) * (Math.random() > 0.5 ? 1 : -1),
      totalInteractions: Math.floor(Math.random() * 300) + 500,
      totalCalls: Math.floor(Math.random() * 150) + 200,
      totalEmails: Math.floor(Math.random() * 500) + 800,
      responsesReceived: Math.floor(Math.random() * 200) + 300,
    },
    emailMetrics: {
      delivered: Math.floor(Math.random() * 10) + 90, // 90-100%
      opened: Math.floor(Math.random() * 30) + 45, // 45-75%
      clicked: Math.floor(Math.random() * 20) + 25, // 25-45%
      replied: Math.floor(Math.random() * 15) + 15, // 15-30%
      forwarded: Math.floor(Math.random() * 10) + 5, // 5-15%
      spam: Math.floor(Math.random() * 3) + 1, // 1-4%
    },
    emailChartData: Array.from({ length: 14 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - 13 + i);
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        opens: Math.floor(Math.random() * 40) + 30, // 30-70%
        replies: Math.floor(Math.random() * 30) + 10, // 10-40%
      };
    }),
    topEmailTemplates: Array.from({ length: 3 }).map((_, i) => ({
      name: [
        "Tech Talent Partnership",
        "Senior Developer Opportunities",
        "Software Engineering Recruitment",
        "Tech Lead Placement",
        "Developer Hiring Solution"
      ][i % 5],
      preview: faker.lorem.sentences(2),
      responseRate: Math.floor(Math.random() * 25) + 20, // 20-45%
      sent: Math.floor(Math.random() * 200) + 50, // 50-250
      openRate: Math.floor(Math.random() * 30) + 50, // 50-80%
      clickRate: Math.floor(Math.random() * 25) + 20, // 20-45%
    })),
    callMetrics: {
      totalCalls: Math.floor(Math.random() * 100) + 100, // 100-200
      avgDuration: Math.floor(Math.random() * 7) + 5, // 5-12 minutes
      sentimentDistribution: {
        positive: 0.45 + (Math.random() * 0.2), // 45-65%
        neutral: 0.2 + (Math.random() * 0.15), // 20-35%
        negative: 0.05 + (Math.random() * 0.15), // 5-20%
      },
      topTopics: [
        { name: "Technical skills", frequency: Math.floor(Math.random() * 20) + 70 }, // 70-90%
        { name: "Salary expectations", frequency: Math.floor(Math.random() * 20) + 60 }, // 60-80%
        { name: "Project experience", frequency: Math.floor(Math.random() * 20) + 50 }, // 50-70%
        { name: "Team collaboration", frequency: Math.floor(Math.random() * 20) + 40 }, // 40-60%
        { name: "Remote work", frequency: Math.floor(Math.random() * 20) + 30 }, // 30-50%
      ],
    },
    upcomingFollowups: Array.from({ length: 4 }).map(() => {
      const company = faker.company.name();
      const daysRemaining = Math.floor(Math.random() * 7); // 0-6 days
      return {
        company,
        daysRemaining,
        task: faker.helpers.arrayElement([
          `Follow up on technical requirements for ${company}`,
          `Send candidate profiles to ${company}`,
          `Schedule technical interview with ${company}`,
          `Discuss offer details with ${company}`,
          `Present shortlisted candidates to ${company}`
        ]),
        channel: faker.helpers.arrayElement(["email", "call"]),
        scheduledTime: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 6) * 10 || '00'} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      };
    }).sort((a, b) => a.daysRemaining - b.daysRemaining),
  };
};
