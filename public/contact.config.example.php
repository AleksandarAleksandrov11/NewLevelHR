<?php
/**
 * Optional configuration for contact.php on classic PHP hosting.
 * Copy this file to contact.config.php (same folder) and adjust the values.
 * Environment variables CONTACT_TO, CONTACT_FROM and CONTACT_TOKEN override these.
 */
return [
    // Recipient of contact-form messages
    'to' => 'info@newlevelhr.com',
    // Sender address; must be a mailbox on this domain for most hosts
    'from' => 'noreply@newlevelhr.com',
    // Optional shared secret; set the same value as PUBLIC_FORM_TOKEN at build time
    'token' => '',
];
