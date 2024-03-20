// ==UserScript==
// @name         Clio Manage - Share Multiple File Links
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Send links of selected files in Clio Manage
// @match        https://app.clio.com/nc/*
// @grant        GM_addStyle
// @updateURL    https://github.com/AlexJwijat/ClioShare/raw/main/share.js
// @downloadURL  https://github.com/AlexJwijat/ClioShare/raw/main/share.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to get the selected file links
    function getSelectedFileLinks() {
        // outlook formatting fix
        const minLength = 120;
        return [...document.querySelectorAll(".row-selection-checkbox > .checked")].map(e => {
            const documentLink = e.parentElement.parentElement.querySelector(".name-column-line__item__name");
            const documentId = documentLink.id;
            const documentTitle = documentLink.querySelector("a").title.trim();
            const documentUrl = `https://app.clio.com/nc/#/documents/${documentId}/details`;
            const line = `${documentTitle}: ${documentUrl}`;
            return line + " ".repeat(Math.max(0, minLength - line.length));;
        }).join("\n");
    }

    // Function to retrieve the username
    function getUsername() {
        const elem = document.querySelector("[data-view-component='user-menu'] span");
        return elem ? elem.textContent : "";
    }

    // Function to open the email application with the selected file links
    function sendSelectedFileLinks() {
        const selectedLinks = getSelectedFileLinks();
        console.log("wtf");
        console.log(selectedLinks);
        console.log("???");
        const username = getUsername();
        const emailSubject = `${username} has shared these files with you`;
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
    sendButton.style.display = 'none';
    sendButton.addEventListener('click', sendSelectedFileLinks);
    document.body.appendChild(sendButton);

    // Add custom styles
    GM_addStyle(`
        button:hover {
            background-color: #45a049;
        }
    `);

    setInterval(function() {
        const checkElems = document.querySelectorAll(".row-selection-checkbox > .checked");
        if (location.href.includes("documents") && checkElems && checkElems.length > 0){
            sendButton.style.display = 'block';
        } else {
            sendButton.style.display = 'none';
        }
    }, 100);


})();