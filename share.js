// ==UserScript==
// @name         Clio Manage - Share Multiple File Links
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Send links of selected files in Clio Manage
// @match        https://app.clio.com/*
// @grant        GM_addStyle
// @updateURL    https://github.com/AlexJwijat/ClioShare/raw/main/share.js
// @downloadURL  https://github.com/AlexJwijat/ClioShare/raw/main/share.js

// ==/UserScript==
(function() {
    'use strict';

    // Function to get the selected file links
    function getSelectedFileLinks() {
        return [...document.querySelectorAll(".row-selection-checkbox > .checked")].map(e => {
            const documentLink = e.parentElement.parentElement.querySelector(".name-column-line__item__name > a");
            const documentId = documentLink.getAttribute('href').split('/')[4];
            const documentTitle = documentLink.title;
            const documentUrl = `https://app.clio.com/nc/#/documents/${documentId}/details`;
            return `${documentTitle}: ${documentUrl}`;
        }).join("\n");
    }

    // Function to open the email application with the selected file links
    function sendSelectedFileLinks() {
        const selectedLinks = getSelectedFileLinks();
        const emailSubject = "Shared";
        const emailBody = selectedLinks;
        const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
    }

    // Create the button element
    const sendButton = document.createElement('button');
    sendButton.textContent = 'Email Files';
    sendButton.style.position = 'fixed';
    sendButton.style.top = "10px";
    sendButton.style.left = "50%";
    sendButton.style.transform = "translate(-50%)";
    sendButton.style.padding = '10px';
    sendButton.style.backgroundColor = '#4CAF50';
    sendButton.style.color = 'white';
    sendButton.style.border = 'none';
    sendButton.style.borderRadius = '4px';
    sendButton.style.cursor = 'pointer';
    sendButton.style.zIndex = '9999';
    sendButton.addEventListener('click', sendSelectedFileLinks);
    document.body.appendChild(sendButton);

    // Add custom styles
    GM_addStyle(`
        button:hover {
            background-color: #45a049;
        }
    `);
})();