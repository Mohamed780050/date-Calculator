// Format date to DD/MM/YYYY
function formatDisplayDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Set today's date as default when page loads
window.onload = function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;
    
    // Set the date input value (hidden)
    document.getElementById('start-date').value = formattedToday;
    // Set the display input value
    document.getElementById('date-display').value = formatDisplayDate(today);
    
    // Add event listener for Enter key on days input
    document.getElementById('days').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            calculateDate();
        }
    });

    // Add event listener for date changes
    document.getElementById('start-date').addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        document.getElementById('date-display').value = formatDisplayDate(selectedDate);
    });

    // Add event listener to open calendar when clicking the display input
    document.getElementById('date-display').addEventListener('click', function() {
        document.getElementById('start-date').showPicker();
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
    
    // Format the date in numbers (DD/MM/YYYY)
    const numericalDate = formatDisplayDate(resultDate);
    
    // Format the date in words
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateInWords = resultDate.toLocaleDateString('en-US', options);
    
    // Display results
    document.getElementById('result-date').textContent = numericalDate;
    document.getElementById('result-date-words').textContent = dateInWords;
}
