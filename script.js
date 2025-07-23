// Company data
const companies = {
    b1: {
        name: "Balcan Innovations Inc.",
        address: "9340 Rue de Meaux, Saint-Léonard, QC H1R 3H2",
        website: "www.balcan.com",
        color: "#FF5F03"
    },
    b2: {
        name: "Balcan Innovations Inc.",
        address: "9475 Rue de Meaux, Saint-Léonard, QC H1R 3H2",
        website: "www.balcan.com",
        color: "#FF5F03"
    },
    b3: {
        name: "Balcan Innovations Inc.",
        address: "304 Rue Saulnier, Laval, QC H7M 3T3",
        website: "www.balcan.com",
        color: "#FF5F03"
    },
    b4: {
        name: "Balcan Innovations Inc.",
        address: "2540 route 139, Drummondville, QC J2A 2P9",
        website: "www.balcan.com",
        color: "#FF5F03"
    },
    b5: {
        name: "Balcan Innovations Inc.",
        address: "8300 Pl. Marien, Montréal-Est, QC H1B 5W6",
        website: "www.balcan.com",
        color: "#FF5F03"
    },
    b6: {
        name: "Covertech Flexible Packaging",
        address: "279 Humberline Drive, Etobicoke, ON M9W 5T6",
        website: "www.rfoil.com",
        color: "#228B22" 
    },
    b8: {
        name: "NELMAR Security Packaging Systems",
        address: "3100 Rue Des Batisseurs, Terrebonne, QC J6Y 0A2",
        website: "www.nelmar.com",
        color: "#E60A02"
    },
    b8_plastixx: {
        name: "Plastixx FFS Technologies",
        address: "3100 Rue Des Batisseurs, Terrebonne, QC J6Y 0A2",
        website: "www.plastixxffs.com",
        color: "#C3AF5B"
    },
    reflectix: {
        name: "Balcan Innovations Inc.",
        address: "1 School St, Markleville, IN 46056, United States",
        website: "www.reflectixinc.com",
        color: "#FF5F03"
    },
    balcan_innovations: {
        name: "Balcan Innovations Inc.",
        address: "7210 108th St. Pleasant Prairie, WI 53158, United States",
        website: "www.balcan.com",
        color: "#FF5F03"
    }
};

// Font size adjustment function - fixed at 1.3x
function adjustFontSize(originalSize) {
    return Math.round(originalSize * 1.3);
}

// Phone number formatting function
function formatPhoneNumber(value) {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
    
    // Apply formatting based on length
    if (digitsOnly.length <= 3) {
        return digitsOnly;
    } else if (digitsOnly.length <= 6) {
        return digitsOnly.replace(/(\d{3})(\d{0,3})/, '$1-$2');
    } else {
        return digitsOnly.replace(/(\d{3})(\d{3})(\d{0,4})/, '$1-$2-$3');
    }
}

// Event listeners
document.getElementById('signatureForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateSignature();
});

// Auto-populate address and website when company is selected
document.getElementById('companyName').addEventListener('change', function() {
    const selectedCompany = this.value;
    if (selectedCompany && companies[selectedCompany]) {
        document.getElementById('address').value = companies[selectedCompany].address;
        document.getElementById('website').value = companies[selectedCompany].website;
    } else {
        document.getElementById('address').value = '';
        document.getElementById('website').value = '';
    }
});

// Phone number formatting for office phone
document.getElementById('phone').addEventListener('input', function(e) {
    const input = e.target;
    const cursorPosition = input.selectionStart;
    const oldLength = input.value.length;
    
    // Format the phone number
    const formattedValue = formatPhoneNumber(input.value);
    input.value = formattedValue;
    
    // Adjust cursor position to account for added dashes
    const newLength = formattedValue.length;
    const lengthDiff = newLength - oldLength;
    
    // Set cursor position
    const newCursorPosition = cursorPosition + lengthDiff;
    input.setSelectionRange(newCursorPosition, newCursorPosition);
});

// Phone number formatting for mobile phone
document.getElementById('mobile').addEventListener('input', function(e) {
    const input = e.target;
    const cursorPosition = input.selectionStart;
    const oldLength = input.value.length;
    
    // Format the phone number
    const formattedValue = formatPhoneNumber(input.value);
    input.value = formattedValue;
    
    // Adjust cursor position to account for added dashes
    const newLength = formattedValue.length;
    const lengthDiff = newLength - oldLength;
    
    // Set cursor position
    const newCursorPosition = cursorPosition + lengthDiff;
    input.setSelectionRange(newCursorPosition, newCursorPosition);
});

function generateSignature() {
    const fullName = document.getElementById('fullName').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const companyKey = document.getElementById('companyName').value;
    const company = companies[companyKey];
    const phone = document.getElementById('phone').value;
    const extension = document.getElementById('extension').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;

    if (!company) {
        alert('Please select a company');
        return;
    }

    // Base font sizes (all multiplied by 1.3)
    const nameFontSize = adjustFontSize(12);
    const companyFontSize = adjustFontSize(11);
    const addressFontSize = adjustFontSize(11);
    const contactFontSize = adjustFontSize(11);
    const websiteFontSize = adjustFontSize(11);

    // Generate the signature HTML with adjusted font sizes
    let signatureHTML = `<div style="font-family: Calibri, sans-serif; line-height: 1.1; margin: 0; padding: 0;">
<div style="font-weight: bold; color: rgb(102, 102, 102); font-size: ${nameFontSize}px; margin: 0; padding: 0;">
${fullName.toUpperCase()} | <span style="font-weight: normal;">${jobTitle}</span>
</div>
<div style="color: ${company.color}; font-weight: bold; font-size: ${companyFontSize}px; margin: 0; padding: 0;">
${company.name}
</div>
<div style="color: rgb(153, 153, 153); font-size: ${addressFontSize}px; margin: 0; padding: 0;">
${company.address}
</div>`;

    // Build the contact line
    let contactLine = '';
    if (phone) {
        contactLine += `T: ${phone}`;
        if (extension) {
            contactLine += ` x${extension}`;
        }
    }
    if (mobile) {
        contactLine += phone ? ` | M: ${mobile}` : `M: ${mobile}`;
    }
    if (phone || mobile) {
        contactLine += ` | `;
    }
    contactLine += `<a href="mailto:${email}" style="color: rgb(153, 153, 153); text-decoration: none;">${email}</a>`;

    signatureHTML += `<div style="color: rgb(153, 153, 153); font-size: ${contactFontSize}px; margin: 0; padding: 0;">
${contactLine}
</div>`;

    // Handle website
    signatureHTML += `<div style="color: rgb(153, 153, 153); font-size: ${websiteFontSize}px; margin: 0; padding: 0;">
<a href="http://${company.website}" style="color: rgb(153, 153, 153); text-decoration: none;">${company.website}</a>
</div>`;

    signatureHTML += `</div>`;

    // Display the signature
    document.getElementById('signaturePreview').innerHTML = signatureHTML;
    document.getElementById('signatureOutput').style.display = 'block';
}

function copySignature() {
    const signatureElement = document.getElementById('signaturePreview');
    
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = signatureElement.innerHTML;
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    document.body.appendChild(tempContainer);
    
    try {
        // Use the modern clipboard API if available
        if (navigator.clipboard && navigator.clipboard.write) {
            // Create a blob with HTML content
            const htmlBlob = new Blob([signatureElement.innerHTML], { type: 'text/html' });
            const textBlob = new Blob([signatureElement.innerText], { type: 'text/plain' });
            
            const clipboardItem = new ClipboardItem({
                'text/html': htmlBlob,
                'text/plain': textBlob
            });
            
            navigator.clipboard.write([clipboardItem]).then(() => {
                alert('Signature copied! You can now paste it directly into your email client.');
            }).catch(() => {
                fallbackCopy();
            });
        } else {
            fallbackCopy();
        }
    } catch (err) {
        fallbackCopy();
    } finally {
        document.body.removeChild(tempContainer);
    }
}

function fallbackCopy() {
    const signatureElement = document.getElementById('signaturePreview');
    
    // Create a temporary div that will be copied
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = signatureElement.innerHTML;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);
    
    // Select the content
    const range = document.createRange();
    range.selectNodeContents(tempDiv);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert('Signature copied! You can now paste it directly into your email client.');
        } else {
            alert('Copy failed.');
        }
    } catch (err) {
        alert('Copy failed.');
    } finally {
        selection.removeAllRanges();
        document.body.removeChild(tempDiv);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // No initialization needed for font size controls
});