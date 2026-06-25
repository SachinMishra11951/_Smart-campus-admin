document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // 1. DYNAMIC SIDEBAR HIGHLIGHT
    // ==========================================================================
    // Automatically highlights the correct sidebar link matching the current page url
    const currentPath = window.location.pathname.split("/").pop();
    const menuItems = document.querySelectorAll(".sidebar-menu li");

    menuItems.forEach(item => {
        const link = item.querySelector("a");
        if (link) {
            const href = link.getAttribute("href");
            if (currentPath === href) {
                // Remove active class from all, then add to current
                menuItems.forEach(i => i.classList.remove("active"));
                item.classList.add("active");
            }
        }
    });

    // ==========================================================================
    // 2. COMPLAINT STATUS UPDATER (manage-complaints.html / admin-dashboard.html)
    // ==========================================================================
    const tableBody = document.querySelector(".data-table tbody");
    
    if (tableBody) {
        tableBody.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-table-action")) {
                const actionButton = e.target;
                const row = actionButton.closest("tr");
                const statusSpan = row.querySelector(".status");
                
                if (statusSpan) {
                    // Logic to rotate through statuses for visual feedback
                    if (statusSpan.classList.contains("pending")) {
                        statusSpan.classList.remove("pending");
                        statusSpan.classList.add("in-progress");
                        statusSpan.textContent = "In Progress";
                        actionButton.textContent = "Update";
                    } else if (statusSpan.classList.contains("in-progress")) {
                        statusSpan.classList.remove("in-progress");
                        statusSpan.classList.add("resolved");
                        statusSpan.textContent = "Resolved";
                        actionButton.textContent = "Archive";
                    } else {
                        // If resolved, let's simulate archiving the row with a nice fade
                        row.style.opacity = "0.3";
                        actionButton.disabled = true;
                        actionButton.style.cursor = "not-allowed";
                        alert(`Complaint ${row.cells[0].textContent} archived successfully.`);
                    }
                }
            }
        });
    }

    // ==========================================================================
    // 3. RESOURCE APPROVAL SYSTEM (resource-booking.html)
    // ==========================================================================
    const approveButtons = document.querySelectorAll(".btn-primary");
    
    approveButtons.forEach(button => {
        // Filter out the settings button so we only target table action triggers
        if (button.textContent.trim() === "Approve") {
            button.addEventListener("click", (e) => {
                const row = e.target.closest("tr");
                const resourceName = row.cells[0].textContent;
                const requestedBy = row.cells[1].textContent;
                
                alert(`✅ Booking Approved!\nResource: ${resourceName}\nAssigned to: ${requestedBy}`);
                row.style.transition = "all 0.5s ease";
                row.style.background = "rgba(0, 230, 118, 0.1)";
                setTimeout(() => row.remove(), 600); // Remove row visually after animation
            });
        }
    });

    // Handle Rejections
    const actionButtons = document.querySelectorAll(".btn-table-action");
    actionButtons.forEach(button => {
        if (button.textContent.trim() === "Reject") {
            button.addEventListener("click", (e) => {
                const row = e.target.closest("tr");
                const resourceName = row.cells[0].textContent;
                
                if(confirm(`Are you sure you want to REJECT the booking for ${resourceName}?`)) {
                    row.style.transition = "all 0.5s ease";
                    row.style.background = "rgba(255, 140, 0, 0.1)";
                    setTimeout(() => row.remove(), 600);
                }
            });
        }
    });

    // ==========================================================================
    // 4. CONFIGURATION CONFIG VALUES (settings.html)
    // ==========================================================================
    const saveSettingsBtn = document.querySelector("form button");
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Stop page from refreshing
            
            // Trigger visual feedback loading text
            const originalText = saveSettingsBtn.textContent;
            saveSettingsBtn.textContent = "Saving Parameters...";
            saveSettingsBtn.style.opacity = "0.7";
            
            setTimeout(() => {
                saveSettingsBtn.textContent = originalText;
                saveSettingsBtn.style.opacity = "1";
                alert("💾 System configurations committed and updated successfully!");
            }, 1000);
        });
    }
});