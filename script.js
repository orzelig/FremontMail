function populateBody() {
    fetch('subjectsAndBodies.json')
        .then(response => response.json())
        .then(subjectsAndBodies => {
            var selectedIndex = document.getElementById('subjectSelect').value;
            // Ensure that the selectedIndex is parsed as an integer, as it might be returned as a string
            selectedIndex = parseInt(selectedIndex, 10);

            var selectedSubjectAndBody = subjectsAndBodies[selectedIndex];

            if (selectedSubjectAndBody) {
                document.getElementById('subject').value = selectedSubjectAndBody.subject;
                document.getElementById('body').value = selectedSubjectAndBody.body.replace(/\\n/g, '\n').replace('[Your Name]', '');
            } else {
                console.error('Selected subject and body could not be found.');
            }

            updateMailtoLink(); // Update the mailto link to reflect the changes
        })
        .catch(error => console.error('Failed to load subjects and bodies:', error));
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
