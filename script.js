var subjectsAndBodies = [
    {
        "subject": "Preserve Unity: Reject Divisive Resolutions",
        "body": "Dear Council Member,\\n\\nAs a Fremont resident deeply invested in the harmony of our community, I urge you to consider the impact of adopting resolutions concerning the Israel-Hamas conflict. Recent events in the Bay Area have shown us the volatile mix of heightened antisemitism and Islamophobia. Introducing one-sided narratives will only exacerbate these tensions, dividing our Muslim and Jewish neighbors further.\\n\\nThe scenes of discord in Oakland and Richmond, marked by hours of public comment filled with hate speech, serve as a caution. We must strive to be a beacon of unity, especially in these challenging times.\\n\\nLet us lead with empathy and inclusiveness, ensuring Fremont remains a welcoming community for all. Rejecting divisive resolutions is a step toward healing and peace.\\n\\nSincerely,\\n[Your Name]"
    },
    {
        "subject": "Stop Hate: No to Biased Israel-Hamas Resolutions",
        "body": "Dear Council Member,\\n\\nAs a Fremont resident, I'm reaching out to express my deep concern over the potential adoption of biased resolutions regarding the Israel-Hamas conflict. Introducing one-sided statements into our community discourse could inadvertently amplify existing antisemitism and Islamophobia, further straining the delicate fabric of our diverse society.\\n\\nThe experiences in nearby cities, where discussions on such resolutions have descended into chaos and hate speech, are a clear warning. We must aim for a higher standard of dialogue in Fremont, one that fosters understanding and peace rather than division.\\n\\nI urge you to stand against any resolution that could polarize our community. Let's focus on building bridges, not walls.\\n\\nWarm regards,\\n[Your Name]"
    },
    // Include the rest of your subjects and bodies objects here
];

function populateBody() {
    var selectedIndex = document.getElementById('subjectSelect').value;
    var selectedSubjectAndBody = subjectsAndBodies[selectedIndex];
    
    document.getElementById('subject').value = selectedSubjectAndBody.subject;
    document.getElementById('body').value = selectedSubjectAndBody.body.replace(/\\n/g, '\n').replace('[Your Name]', ''); // Replace '\\n' with '\n' and '[Your Name]' with an empty string initially
    
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
