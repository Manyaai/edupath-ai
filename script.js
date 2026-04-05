// AI Decision Engine - Career Path Predictor
const careerDatabase = {
    // Career recommendations based on multiple factors
    predictCareer: function(subject, interest, techAccess, education, strength, jobMarket) {
        let score = {};
        
        // Subject-based recommendations
        if(subject === 'math') {
            score = { 
                'Data Scientist': 95, 
                'Accountant': 88, 
                'Economics Researcher': 85,
                'Banking Professional': 82,
                'Actuary': 90
            };
        } else if(subject === 'science') {
            score = { 
                'Research Scientist': 92, 
                'Environmental Engineer': 88, 
                'Lab Technician': 85,
                'Science Teacher': 87,
                'Pharma Researcher': 89
            };
        } else if(subject === 'computers') {
            score = { 
                'Software Developer': 98, 
                'Web Designer': 90, 
                'IT Support Specialist': 88,
                'App Developer': 92,
                'Cybersecurity Analyst': 89
            };
        } else if(subject === 'commerce') {
            score = { 
                'Business Analyst': 92, 
                'Marketing Manager': 88, 
                'Entrepreneur': 90,
                'Financial Advisor': 87,
                'E-commerce Manager': 85
            };
        } else if(subject === 'arts') {
            score = { 
                'Graphic Designer': 94, 
                'Content Creator': 90, 
                'UX/UI Designer': 88,
                'Social Media Manager': 86,
                'Animator': 89
            };
        } else if(subject === 'biology') {
            score = { 
                'Healthcare Assistant': 92, 
                'Nutritionist': 88, 
                'Medical Lab Tech': 90,
                'Pharmacist Assistant': 87,
                'Public Health Worker': 89
            };
        }
        
        // Adjust based on interest
        if(interest === 'helping') {
            this.adjustScore(score, ['Teacher', 'Counselor', 'Healthcare', 'Social Worker'], 15);
        } else if(interest === 'creating') {
            this.adjustScore(score, ['Designer', 'Developer', 'Artist', 'Writer', 'Animator'], 15);
        } else if(interest === 'analyzing') {
            this.adjustScore(score, ['Data', 'Research', 'Analyst', 'Scientist'], 15);
        } else if(interest === 'leading') {
            this.adjustScore(score, ['Manager', 'Entrepreneur', 'Director', 'Supervisor'], 15);
        }
        
        // Adjust for tech access
        if(techAccess === 'low') {
            // Prioritize offline-friendly careers
            for(let career in score) {
                if(career.includes('Digital') || career.includes('Online') || career === 'Software Developer') {
                    score[career] -= 30;
                }
                if(career.includes('Teacher') || career.includes('Assistant') || career.includes('Technician')) {
                    score[career] += 20;
                }
            }
        } else if(techAccess === 'medium') {
            // Mobile-friendly careers get boost
            for(let career in score) {
                if(career.includes('Designer') || career.includes('Content') || career.includes('Social Media')) {
                    score[career] += 15;
                }
            }
        }
        
        // Adjust for education level
        if(education === '10th') {
            // Suggest diploma/certificate paths
            for(let career in score) {
                if(career.includes('Scientist') || career.includes('Engineer') || career.includes('Analyst')) {
                    score[career] -= 20;
                }
                if(career.includes('Assistant') || career.includes('Technician') || career.includes('Support')) {
                    score[career] += 25;
                }
            }
        } else if(education === '12th') {
            for(let career in score) {
                if(career.includes('Scientist') || career.includes('Engineer')) {
                    score[career] -= 10;
                }
            }
        }
        
        // Adjust for strength
        if(strength === 'logic') {
            this.adjustScore(score, ['Analyst', 'Scientist', 'Developer', 'Researcher'], 15);
        } else if(strength === 'creativity') {
            this.adjustScore(score, ['Designer', 'Artist', 'Creator', 'Animator'], 15);
        } else if(strength === 'communication') {
            this.adjustScore(score, ['Teacher', 'Manager', 'Marketing', 'Counselor'], 15);
        } else if(strength === 'empathy') {
            this.adjustScore(score, ['Healthcare', 'Counselor', 'Social', 'Teacher', 'Assistant'], 15);
        }
        
        // Adjust for job market preference
        if(jobMarket === 'local') {
            this.adjustScore(score, ['Teacher', 'Assistant', 'Technician', 'Banking', 'Healthcare'], 20);
        } else if(jobMarket === 'remote') {
            this.adjustScore(score, ['Developer', 'Designer', 'Writer', 'Analyst', 'Marketing'], 25);
        }
        
        // Sort and return top 3
        let sorted = Object.entries(score).sort((a,b) => b[1] - a[1]);
        return sorted.slice(0, 3);
    },
    
    adjustScore: function(score, keywords, boost) {
        for(let career in score) {
            for(let keyword of keywords) {
                if(career.includes(keyword)) {
                    score[career] += boost;
                    break;
                }
            }
        }
    },
    
    getLearningPath: function(career, education, techAccess) {
        let path = [];
        
        if(education === '10th') {
            path.push("🎓 Complete 12th grade with focus on relevant subjects");
            path.push("📜 Enroll in a 1-2 year diploma/certificate program");
        } else if(education === '12th') {
            path.push("🎓 Apply for a diploma or bachelor's program");
            path.push("📚 Look for scholarships and financial aid");
        } else {
            path.push("🎓 Consider specialized certification courses");
            path.push("💼 Build portfolio through internships");
        }
        
        if(techAccess === 'low') {
            path.push("📖 Visit local library or community center for resources");
            path.push("🤝 Connect with local professionals for mentorship");
        } else if(techAccess === 'medium') {
            path.push("📱 Use mobile learning apps (Coursera, YouTube, Khan Academy)");
            path.push("💻 Join online communities for support");
        } else {
            path.push("💻 Take online courses (Coursera, Udemy, edX)");
            path.push("🌐 Build LinkedIn profile and network online");
        }
        
        path.push("🏆 Start with entry-level positions or apprenticeships");
        path.push("📈 Continuously upskill every 6-12 months");
        
        return path;
    },
    
    getScholarshipInfo: function() {
        return [
            "🎓 National Means Cum Merit Scholarship (India)",
            "💡 Google Career Certificates (Free financial aid available)",
            "🌍 Coursera Financial Aid (100% free certificates)",
            "📚 State Government Backward Class Scholarship",
            "🏅 Private company internships with stipends"
        ];
    }
};

// Handle form submission
document.getElementById('careerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get values
    const subject = document.getElementById('subject').value;
    const interest = document.getElementById('interest').value;
    const techAccess = document.getElementById('techAccess').value;
    const education = document.getElementById('education').value;
    const strength = document.getElementById('strength').value;
    const jobMarket = document.getElementById('jobMarket').value;
    
    // Get AI prediction
    const predictions = careerDatabase.predictCareer(subject, interest, techAccess, education, strength, jobMarket);
    const learningPath = careerDatabase.getLearningPath(predictions[0][0], education, techAccess);
    const scholarships = careerDatabase.getScholarshipInfo();
    
    // Build result HTML
    let resultHTML = `
        <div class="career-card">
            <h3>🎯 Top Career Recommendations</h3>
    `;
    
    predictions.forEach((pred, index) => {
        let emoji = index === 0 ? "🏆" : (index === 1 ? "🥈" : "🥉");
        resultHTML += `
            <div class="job-suggestion">
                <strong>${emoji} ${pred[0]}</strong><br>
                Match Score: ${pred[1]}%<br>
                <small>💰 Average Salary: ₹${this.getSalaryRange(pred[0])}</small>
            </div>
        `;
    });
    
    resultHTML += `
        </div>
        
        <h3>📚 Your Personalized Learning Path</h3>
        <ul>
    `;
    
    learningPath.forEach(step => {
        resultHTML += `<li>${step}</li>`;
    });
    
    resultHTML += `
        </ul>
        
        <h3>🎓 Scholarships & Financial Aid Available</h3>
        <ul>
    `;
    
    scholarships.forEach(scholarship => {
        resultHTML += `<li>${scholarship}</li>`;
    });
    
    resultHTML += `
        </ul>
        
        <div style="background: #e8f5e9; padding: 15px; border-radius: 10px; margin-top: 20px;">
            <strong>💪 Next Steps (Next 30 days):</strong><br>
            1️⃣ Research your top career choice on YouTube/Google<br>
            2️⃣ Apply for at least 3 scholarships<br>
            3️⃣ Take one free online course in your field<br>
            4️⃣ Talk to 2 professionals in this career<br>
            5️⃣ Create a simple 1-page resume
        </div>
    `;
    
    document.getElementById('resultContent').innerHTML = resultHTML;
    document.getElementById('result').style.display = 'block';
    document.querySelector('.form-card').style.display = 'none';
    
    // Scroll to result
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
});

function getSalaryRange(career) {
    const salaries = {
        'Data Scientist': '6-15 LPA',
        'Software Developer': '5-12 LPA',
        'Graphic Designer': '3-8 LPA',
        'Teacher': '3-6 LPA',
        'Healthcare Assistant': '2.5-5 LPA',
        'Business Analyst': '5-10 LPA',
        'Entrepreneur': 'Variable (2-20 LPA)',
        'Digital Marketer': '3-9 LPA'
    };
    
    for(let key in salaries) {
        if(career.includes(key)) {
            return salaries[key];
        }
    }
    return '3-8 LPA';
}

function exportReport() {
    const resultText = document.getElementById('resultContent').innerText;
    const blob = new Blob([resultText], {type: 'text/plain'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'EduPath_AI_Career_Report.txt';
    link.click();
    alert('✅ Report downloaded! You can share this with teachers/counselors.');
}

function resetForm() {
    document.getElementById('careerForm').reset();
    document.getElementById('result').style.display = 'none';
    document.querySelector('.form-card').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add this function to script.js (for the salary reference)
window.getSalaryRange = getSalaryRange;