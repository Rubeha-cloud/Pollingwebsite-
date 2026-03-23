document.getElementById('voteForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const option = document.querySelector('input[name="option"]:checked')?.value;

    if (!name || !option) {
        alert("Please enter your name and select an option.");
        return;
    }

    try {
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, option })
        });

        if (response.ok) {
            document.getElementById('voteForm').style.display = 'none';
            document.getElementById('thankYou').style.display = 'block';
        } else {
            alert('Error casting vote. Please try again!');
        }
    } catch (err) {
        alert('Network error. Please check your connection.');
    }
});