CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255),
    jobposition VARCHAR(255),
    avatar VARCHAR(255),
    dob DATE,
    gender VARCHAR(50),
    yearsofexperience INT DEFAULT 0 NOT NULL,
    email VARCHAR(255) NOT NULL,
    phonenumber VARCHAR(50),
    sociallink VARCHAR(255),
    github VARCHAR(255),
    technicals TEXT[],
    summary TEXT,
    softskills TEXT[],
    workExperience JSONB[],
    education JSONB[],
    projects JSONB[],
    languages JSONB[],
    hobbies TEXT[],
    activities JSONB[],
    otherinformations JSONB[],
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create cvs table
CREATE TABLE cvs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    name VARCHAR(50), 
	link VARCHAR(255),
    listjob VARCHAR(50)[],
    is_main BOOLEAN DEFAULT false,
    archived BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create employers table
CREATE TABLE IF NOT EXISTS employers (
    id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    status INT DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO candidates (
    fullname, jobposition, avatar, dob, gender, yearsofexperience, email, phonenumber,
    sociallink, github, technicals, summary, softskills, workexperience, education,
    projects, languages, hobbies, activities, otherinformations
) VALUES 
(
    'John Doe', 'Software Engineer', 'https://example.com/avatar1.jpg', '1990-01-01', 'Male', 5, 'johndoe@example.com',
    '123-456-7890', 'https://linkedin.com/in/johndoe', 'https://github.com/johndoe', 
    ARRAY['JavaScript', 'React', 'Node.js'], 'Experienced software engineer with a focus on web development.',
    ARRAY['Communication', 'Problem-solving'], 
    ARRAY['{"position": "Software Engineer", "company": "Tech Corp", "isCurrentJob": true, "startDate": "2020-01-01", "endDate": null, "description": "Developing web applications.", "skills": ["JavaScript", "React"], "projects": [{"name": "Project A", "time": "2021-06", "position": "Lead Developer", "description": "Developed the frontend."}]}'::JSONB], 
    ARRAY['{"schoolName": "University of Technology", "major": "Computer Science", "isCurrentSchool": false, "startDate": "2010-09-01", "endDate": "2014-06-01", "description": "Studied computer science."}'::JSONB], 
    ARRAY['{"name": "Open Source Project", "time": "2022-01", "position": "Contributor", "description": "Contributed to open source."}'::JSONB], 
    ARRAY['{"type": "English", "level": "Fluent"}'::JSONB], 
    ARRAY['Reading', 'Hiking'], 
    ARRAY['{"name": "Volunteer Work", "isCurrentActivity": false, "startDate": "2019-01-01", "endDate": "2019-12-31", "description": "Volunteered at a local shelter."}'::JSONB], 
    ARRAY['{"name": "Certification", "description": "Certified in AWS."}'::JSONB]
),
(
    'Jane Smith', 'Data Scientist', 'https://example.com/avatar2.jpg', '1985-05-15', 'Female', 8, 'janesmith@example.com',
    '987-654-3210', 'https://linkedin.com/in/janesmith', 'https://github.com/janesmith', 
    ARRAY['Python', 'Machine Learning', 'Data Analysis'], 'Experienced data scientist with a background in machine learning.',
    ARRAY['Analytical thinking', 'Teamwork'], 
    ARRAY['{"position": "Data Scientist", "company": "Data Inc.", "isCurrentJob": true, "startDate": "2018-03-01", "endDate": null, "description": "Analyzing data and building models.", "skills": ["Python", "Machine Learning"], "projects": [{"name": "Project B", "time": "2019-09", "position": "Lead Data Scientist", "description": "Developed a machine learning model."}]}'::JSONB], 
    ARRAY['{"schoolName": "Institute of Technology", "major": "Data Science", "isCurrentSchool": false, "startDate": "2005-09-01", "endDate": "2009-06-01", "description": "Studied data science."}'::JSONB], 
    ARRAY['{"name": "AI Research Project", "time": "2020-01", "position": "Researcher", "description": "Conducted research on AI."}'::JSONB], 
    ARRAY['{"type": "Spanish", "level": "Intermediate"}'::JSONB], 
    ARRAY['Cooking', 'Traveling'], 
    ARRAY['{"name": "Mentorship Program", "isCurrentActivity": true, "startDate": "2021-05-01", "endDate": null, "description": "Mentoring junior data scientists."}'::JSONB], 
    ARRAY['{"name": "Publication", "description": "Published a paper on data science."}'::JSONB]
),
(
    'Alice Johnson', 'UI/UX Designer', 'https://example.com/avatar3.jpg', '1992-11-22', 'Female', 4, 'alicejohnson@example.com',
    '555-123-4567', 'https://linkedin.com/in/alicejohnson', 'https://github.com/alicejohnson', 
    ARRAY['Figma', 'Sketch', 'Adobe XD'], 'Creative UI/UX designer with a passion for user-centered design.',
    ARRAY['Creativity', 'Attention to detail'], 
    ARRAY['{"position": "UI/UX Designer", "company": "Design Studio", "isCurrentJob": true, "startDate": "2019-07-01", "endDate": null, "description": "Designing user interfaces and experiences.", "skills": ["Figma", "Sketch"], "projects": [{"name": "Project C", "time": "2020-10", "position": "Lead Designer", "description": "Designed a mobile app."}]}'::JSONB], 
    ARRAY['{"schoolName": "Art School", "major": "Graphic Design", "isCurrentSchool": false, "startDate": "2011-09-01", "endDate": "2015-06-01", "description": "Studied graphic design."}'::JSONB], 
    ARRAY['{"name": "Freelance Project", "time": "2021-05", "position": "Freelancer", "description": "Designed a website for a client."}'::JSONB], 
    ARRAY['{"type": "French", "level": "Beginner"}'::JSONB], 
    ARRAY['Drawing', 'Photography'], 
    ARRAY['{"name": "Design Conference", "isCurrentActivity": true, "startDate": "2022-01-01", "endDate": null, "description": "Speaking at design conferences."}'::JSONB], 
    ARRAY['{"name": "Award", "description": "Won a design award."}'::JSONB]
),
(
    'Bob Brown', 'DevOps Engineer', 'https://example.com/avatar4.jpg', '1988-07-19', 'Male', 6, 'bobbrown@example.com',
    '654-321-0987', 'https://linkedin.com/in/bobbrown', 'https://github.com/bobbrown', 
    ARRAY['AWS', 'Docker', 'Kubernetes'], 'Skilled DevOps engineer with experience in cloud infrastructure.',
    ARRAY['Problem-solving', 'Collaboration'], 
    ARRAY['{"position": "DevOps Engineer", "company": "Cloud Services", "isCurrentJob": true, "startDate": "2017-04-01", "endDate": null, "description": "Managing cloud infrastructure.", "skills": ["AWS", "Docker"], "projects": [{"name": "Project D", "time": "2018-08", "position": "DevOps Lead", "description": "Implemented CI/CD pipelines."}]}'::JSONB], 
    ARRAY['{"schoolName": "Tech University", "major": "Information Technology", "isCurrentSchool": false, "startDate": "2006-09-01", "endDate": "2010-06-01", "description": "Studied information technology."}'::JSONB], 
    ARRAY['{"name": "Automation Project", "time": "2020-03", "position": "Lead Engineer", "description": "Automated infrastructure deployment."}'::JSONB], 
    ARRAY['{"type": "German", "level": "Advanced"}'::JSONB], 
    ARRAY['Cycling', 'Gaming'], 
    ARRAY['{"name": "Tech Meetup", "isCurrentActivity": true, "startDate": "2021-02-01", "endDate": null, "description": "Organizing local tech meetups."}'::JSONB], 
    ARRAY['{"name": "Certification", "description": "Certified Kubernetes Administrator."}'::JSONB]
),
(
    'Charlie Davis', 'Product Manager', 'https://example.com/avatar5.jpg', '1995-03-14', 'Male', 3, 'charliedavis@example.com',
    '321-654-9870', 'https://linkedin.com/in/charliedavis', 'https://github.com/charliedavis', 
    ARRAY['Agile', 'Scrum', 'Product Management'], 'Product manager with experience in agile methodologies.',
    ARRAY['Leadership', 'Strategic thinking'], 
    ARRAY['{"position": "Product Manager", "company": "Tech Innovations", "isCurrentJob": true, "startDate": "2021-05-01", "endDate": null, "description": "Managing product development.", "skills": ["Agile", "Scrum"], "projects": [{"name": "Project E", "time": "2022-09", "position": "Product Lead", "description": "Launched a new product feature."}]}'::JSONB], 
    ARRAY['{"schoolName": "Business School", "major": "Business Administration", "isCurrentSchool": false, "startDate": "2013-09-01", "endDate": "2017-06-01", "description": "Studied business administration."}'::JSONB], 
    ARRAY['{"name": "Startup Project", "time": "2021-10", "position": "Founder", "description": "Started a tech company."}'::JSONB], 
    ARRAY['{"type": "Japanese", "level": "Intermediate"}'::JSONB], 
    ARRAY['Cooking', 'Traveling'], 
    ARRAY['{"name": "Startup Incubator", "isCurrentActivity": true, "startDate": "2023-01-01", "endDate": null, "description": "Mentoring startups."}'::JSONB], 
    ARRAY['{"name": "Publication", "description": "Published a book on product management."}'::JSONB]
);


INSERT INTO cvs (user_id, name, link, listjob, is_main) VALUES 
(1, 'cv1.pdf', 'https://example.com/cv1.pdf', ARRAY['job1', 'job2'], true),
(1, 'cv2.pdf', 'https://example.com/cv2.pdf', ARRAY['job3', 'job4'], false),
(2, 'cv3.pdf', 'https://example.com/cv3.pdf', ARRAY['job1', 'job2'], true),
(2, 'cv4.pdf', 'https://example.com/cv4.pdf', ARRAY['job3', 'job4'], false),
(3, 'cv5.pdf', 'https://example.com/cv5.pdf', ARRAY['job1', 'job2'], true),
(3, 'cv6.pdf', 'https://example.com/cv6.pdf', ARRAY['job3', 'job4'], false),
(4, 'cv7.pdf', 'https://example.com/cv7.pdf', ARRAY['job1', 'job2'], true),
(4, 'cv8.pdf', 'https://example.com/cv8.pdf', ARRAY['job3', 'job4'], false),
(5, 'cv9.pdf', 'https://example.com/cv9.pdf', ARRAY['job1', 'job2'], true),
(5, 'cv10.pdf', 'https://example.com/cv10.pdf', ARRAY['job3', 'job4'], false);


-- Insert mock data into employers table
INSERT INTO
    employers (company_id, email, name, phone, status)
VALUES
    (
        101,
        'employer1@example.com',
        'Tech Solutions Inc.',
        '555-123-4567',
        1
    ),
    (
        102,
        'employer2@example.com',
        'Tech Innovations LLC',
        '555-987-6543',
        1
    ),
    (
        103,
        'employer3@example.com',
        'Innovate Solutions Ltd.',
        '777-111-2222',
        1
    ),
    (
        104,
        'employer4@example.com',
        'Data Tech Enterprises',
        '999-333-4444',
        1
    );