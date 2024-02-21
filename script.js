// Global variable to store the shuffled subjects and bodies
let shuffledSubjectsAndBodies = [];

// Function to fetch, shuffle, and store subjects and bodies
function fetchAndShuffleData() {
    fetch('subjectsAndBodies.json')
        .then(response => response.json())
        .then(data => {
            shuffleArray(data); // Shuffle the data
            shuffledSubjectsAndBodies = data; // Store the shuffled data globally
            loadSubjects(); // Load subjects into the dropdown
            populateBody(); // Populate body for the initially selected subject
        })
        .catch(error => console.error('Failed to load subjects and bodies:', error));
}

// Function to load subjects into the dropdown
function loadSubjects() {
    const subjectSelect = document.getElementById('subjectSelect');
    subjectSelect.innerHTML = ''; // Clear existing options

    shuffledSubjectsAndBodies.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = index; // Using the index as the value to keep track of selected option
        option.textContent = item.subject;
        subjectSelect.appendChild(option);
    });
}

// Function to populate the body based on the selected subject
function populateBody() {
    var selectedIndex = document.getElementById('subjectSelect').value;
    selectedIndex = parseInt(selectedIndex, 10); // Ensure it's an integer

    var selectedSubjectAndBody = shuffledSubjectsAndBodies[selectedIndex];

    if (selectedSubjectAndBody) {
        document.getElementById('subject').value = selectedSubjectAndBody.subject;
        document.getElementById('body').value = selectedSubjectAndBody.body.replace(/\\n/g, '\n').replace('[Your Name]', '');
    } else {
        console.error('Selected subject and body could not be found.');
    }

    updateMailtoLink(); // Update the mailto link to reflect the changes
}

// Fisher-Yates (Knuth) Shuffle algorithm for shuffling an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Function to load recipients into the dropdown
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

// Function to update the mailto link based on form inputs
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

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchAndShuffleData(); // Fetch and shuffle subjects and bodies
    loadRecipients(); // Load recipients into the dropdown
});
