const bodyHeader = `
<table class="body" data-made-with-foundation>
  <tr>
    <!-- The class, align, and <center> tag center the container -->
    <td class="float-center" align="center" valign="top">
      <center>
`;

const header = `<!-- Emails use the XHTML Strict doctype -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="https://www.w3.org/1999/xhtml">
<head>
  <!-- The character set should be utf-8 -->
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width"/>
  <!-- Link to the email's CSS, which will be inlined into the email -->
  <link rel="stylesheet" href="/css/foundation-emails.css" />
</head>
<body>
${bodyHeader}`;

const bodyFooter = `
</center>
</td>
</tr>
</table>`;

const footer = `
${bodyFooter}
</body>
</html>`;

module.exports = { bodyHeader, header, bodyFooter, footer };
