var subjectsAndBodies = [
        {
            "subject": "Preserve Unity: Reject Divisive Resolutions",
            "body": "Dear Council Member,\\n\\nAs a Fremont resident deeply invested in the harmony of our community, I urge you to consider the impact of adopting resolutions concerning the Israel-Hamas conflict. Recent events in the Bay Area have shown us the volatile mix of heightened antisemitism and Islamophobia. Introducing one-sided narratives will only exacerbate these tensions, dividing our Muslim and Jewish neighbors further.\\n\\nThe scenes of discord in Oakland and Richmond, marked by hours of public comment filled with hate speech, serve as a caution. We must strive to be a beacon of unity, especially in these challenging times.\\n\\nLet us lead with empathy and inclusiveness, ensuring Fremont remains a welcoming community for all. Rejecting divisive resolutions is a step toward healing and peace.\\n\\nSincerely,\\n[Your Name]"
        },
        {
            "subject": "Stop Hate: No to Biased Israel-Hamas Resolutions",
            "body": "Dear Council Member,\\n\\nAs a Fremont resident, I'm reaching out to express my deep concern over the potential adoption of biased resolutions regarding the Israel-Hamas conflict. Introducing one-sided statements into our community discourse could inadvertently amplify existing antisemitism and Islamophobia, further straining the delicate fabric of our diverse society.\\n\\nThe experiences in nearby cities, where discussions on such resolutions have descended into chaos and hate speech, are a clear warning. We must aim for a higher standard of dialogue in Fremont, one that fosters understanding and peace rather than division.\\n\\nI urge you to stand against any resolution that could polarize our community. Let's focus on building bridges, not walls.\\n\\nWarm regards,\\n[Your Name]"
        },
        {
            "subject": "Choose Empathy Over Division",
            "body": "Dear Council Member,\\n\\nAs a member of the Fremont community, I implore you to consider the wider implications of adopting resolutions on the Israel-Hamas conflict. At a time when divisiveness is at its peak, it's crucial that we choose empathy and understanding over further division.\\n\\nWe have seen the detrimental effects such resolutions have had in neighboring cities, inciting antisemitism, Islamophobia, and disrupting the peace. Fremont has always been a place of inclusivity and respect, and it is essential we maintain this by rejecting proposals that only serve to divide us.\\n\\nI trust in your leadership to ensure our community remains a safe and welcoming environment for all its residents, free from hate and division.\\n\\nBest regards,\\n[Your Name]"
        },
        {
            "subject": "Unity Not Division: Reject Conflict Resolutions",
            "body": "Dear Council Member,\\n\\nI write to you as a concerned citizen of Fremont, urging you to reject any resolutions that may bring division to our community, especially concerning the Israel-Hamas conflict. The escalation of antisemitism and Islamophobia in our area is alarming, and divisive resolutions will only worsen these issues.\\n\\nWe must learn from the experiences of cities like Oakland and Richmond, where similar resolutions have led to public unrest and divisiveness. Fremont must stand as a community that prioritizes unity and peace over conflict and division.\\n\\nPlease consider the broader impact of such resolutions and choose to support initiatives that unite rather than divide.\\n\\nKind regards,\\n[Your Name]"
        },
        {
            "subject": "Stand Together: Say No to Divisive Motions",
            "body": "Dear Council Member,\\n\\nAs a resident of Fremont, I feel compelled to voice my opposition to any divisive resolutions related to the Israel-Hamas conflict. Our community's strength lies in its diversity and unity, and it's vital that we protect this by rejecting motions that could sow discord.\\n\\nThe negative consequences of such resolutions are evident in the disruptions they've caused in other cities, leading to an increase in hate speech and community tension. In these trying times, we must stand together and focus on what brings us together, not what drives us apart.\\n\\nI urge you to consider the impact of these resolutions and to choose a path that promotes peace and unity in our community.\\n\\nSincerely,\\n[Your Name]"
        }
    ];

function populateBody() {
    var selectedIndex = document.getElementById('subjectSelect').value;
    var selectedSubjectAndBody = subjectsAndBodies[selectedIndex];
    
    // Ensure that the selectedIndex is parsed as an integer, as it might be returned as a string
    selectedIndex = parseInt(selectedIndex, 10);

    if (selectedSubjectAndBody) {
        document.getElementById('subject').value = selectedSubjectAndBody.subject;
        document.getElementById('body').value = selectedSubjectAndBody.body.replace(/\\n/g, '\n').replace('[Your Name]', '');
    } else {
        console.error('Selected subject and body could not be found.');
    }

    updateMailtoLink(); // Update the mailto link to reflect the changes
}

function updateMailtoLink() {
    var from = document.getElementById('from').value;
    var recipient = document.getElementById('recipient').value;
    var subject = document.getElementById('subject').value;
    var body = document.getElementById('body').value;
    var sendCopyChecked = document.getElementById('sendCopy').checked; // Get the state of the checkbox

    // Append "With gratitude, [Your Name]" to the body if 'from' is not empty
    var fullBody = body + (from ? "\n\nWith gratitude,\n" + from : "");

    subject = encodeURIComponent(subject);
    fullBody = encodeURIComponent(fullBody); // Encode the full body for the mailto link

    var link = `mailto:${recipient}?subject=${subject}&body=${fullBody}`;

    // Include BCC parameter in the mailto link if the checkbox is checked
    if (sendCopyChecked) {
        var bcc = "fremont_mail_counter@zelig.me";
        link += `&bcc=${bcc}`;
    }

    document.getElementById('mailtoLink').href = link;
}

function loadRecipients() {
    fetch('recipients.json')
        .then(response => response.json())
        .then(data => {
            const recipientSelect = document.getElementById('recipient');
            data.recipients.forEach(recipient => {
                const option = document.createElement('option');
                option.value = recipient.email;
                option.textContent = recipient.name;
                recipientSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Failed to load recipient data:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    loadRecipients();
    populateBody();
});
