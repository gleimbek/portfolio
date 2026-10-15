# Gustavo Leimbek — Portfolio

Bilingual (Spanish / English) portfolio: projects, experience, certifications and free downloadable resources.

**Live site:** https://gleimbek.github.io/portfolio/

## Structure

```
├── index.html         # Redirects to /es/ or /en/ based on the browser language
├── es/index.html      # Spanish version
├── en/index.html      # English version
└── assets/
    ├── css/style.css
    ├── js/descargas.js        # Download forms for the PDF resources (Formspree)
    ├── certificados/          # Certificate PDFs
    ├── recursos/              # Downloadable cheat sheets and checklists
    └── imagenes/
```

## Built with

HTML, CSS and vanilla JavaScript, no build step. Contact and download forms are sent through [Formspree](https://formspree.io).

## Run locally

```bash
npx serve .
```

Then open the address it prints. Serving the folder (instead of opening the file directly) is needed for the language redirect and the download forms.
