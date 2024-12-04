// Set today's date as default when page loads
window.onload = function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;
    document.getElementById('start-date').value = formattedToday;
    
    // Add event listener for Enter key on days input
    document.getElementById('days').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            calculateDate();
        }
    });
}

function calculateDate() {
    // Get input values
    const startDate = document.getElementById('start-date').value;
    const daysToAdd = parseInt(document.getElementById('days').value);
    
    // Validate inputs
    if (!startDate || !daysToAdd) {
        alert('Please fill in all fields');
        return;
    }
    
    // Create date object and add days
    const resultDate = new Date(startDate);
    resultDate.setDate(resultDate.getDate() + daysToAdd);
    
    // Format the result date in words
    const optionsWords = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    // Format the date in numbers (DD/MM/YYYY)
    const day = String(resultDate.getDate()).padStart(2, '0');
    const month = String(resultDate.getMonth() + 1).padStart(2, '0');
    const year = resultDate.getFullYear();
    const numericalDate = `${day}/${month}/${year}`;
    
    const formattedDate = resultDate.toLocaleDateString('en-US', optionsWords);
    
    // Display result
    document.getElementById('result-date').innerHTML = `
        ${formattedDate}<br>
        <span style="font-size: 1.1rem; color: #667eea">${numericalDate}</span>
    `;
}
