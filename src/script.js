// Function to populate the table
function populateTable() {
    const tableBody = document.querySelector('#dynamic-table tbody');
  
    // Clear existing rows
    tableBody.innerHTML = '';
  
    // Iterate over the keys of the first map
    for (const key of map.keys()) {
      const row = tableBody.insertRow();
  
      // Column 1
      const cell1 = row.insertCell(0);
      cell1.textContent = key;
  
      // Column 2
      const cell2 = row.insertCell(1);
      cell2.textContent = map.get(key);
  
      // Column 3 with progress bar
      const cell3 = row.insertCell(2);
      const progressBarContainer = document.createElement('div');
      progressBarContainer.className = 'progress-bar-container';
  
      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      // Assuming you have a number for the progress, replace 'yourProgressValue' with the actual value
      progressBar.style.width = `${yourProgressValue}%`;
  
      progressBarContainer.appendChild(progressBar);
      cell3.appendChild(progressBarContainer);
    }
  }
  
  // Call the function to populate the table when the page is loaded
  window.onload = populateTable;
  