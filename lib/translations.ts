export type Language = "en" | "de" | "ar";

export const translations = {
  en: {
    // Header
    header: {
      services: "Services",
      whyUs: "Why Us",
      contact: "Contact",
      getStarted: "Get Started",
    },

    // Hero Section
    hero: {
      title1: "Digital Solutions",
      title2: "Synchronized",
      description:
        "We build enterprise-grade software solutions that transform your business. From ERP systems to AI agents, we synchronize technology with your vision.",
      startProject: "Start Your Project",
      viewServices: "View Services",
      stats: {
        projects: "Projects",
        clients: "Clients",
        years: "Years",
        success: "Success",
      },
    },

    // Services Section
    services: {
      badge: "Our Services",
      title1: "Digital Solutions for",
      title2: "Modern Businesses",
      description:
        "We deliver cutting-edge software solutions tailored to your unique business needs",
      items: {
        erp: {
          title: "ERP Systems",
          description:
            "Comprehensive enterprise resource planning solutions that streamline your operations and boost efficiency.",
        },
        crm: {
          title: "CRM Solutions",
          description:
            "Customer relationship management platforms that help you build lasting relationships and drive growth.",
        },
        ecommerce: {
          title: "E-Commerce",
          description:
            "Scalable online stores with seamless payment integration and exceptional user experiences.",
        },
        mobile: {
          title: "Mobile Apps",
          description:
            "Native and cross-platform mobile applications that engage users on iOS and Android.",
        },
        ai: {
          title: "AI Agents",
          description:
            "Intelligent automation and AI-powered solutions that transform how you work and serve customers.",
        },
        appointment: {
          title: "Appointment Systems",
          description:
            "Smart scheduling and booking platforms that optimize time management and reduce no-shows.",
        },
      },
    },

    // Why Us Section
    whyUs: {
      badge: "WHY CHOOSE US",
      title1: "BUILT FOR PERFORMANCE",
      title2: "DESIGNED FOR SUCCESS",
      description:
        "We combine technical excellence with business acumen to deliver solutions that drive real results",
      cta: {
        title: "READY TO TRANSFORM YOUR BUSINESS?",
        description: "Let's discuss how we can help you achieve your digital goals",
        button: "SCHEDULE A CONSULTATION",
      },
      reasons: {
        fastDelivery: {
          title: "Fast Delivery",
          description:
            "Agile development process ensures rapid deployment without compromising quality.",
        },
        security: {
          title: "Enterprise Security",
          description:
            "Bank-level security protocols protect your data and your customers' trust.",
        },
        team: {
          title: "Expert Team",
          description:
            "Seasoned developers and designers with proven track records in enterprise software.",
        },
        scalable: {
          title: "Scalable Solutions",
          description:
            "Future-proof architecture that grows with your business needs.",
        },
        warranty: {
          title: "Warranty & Maintenance",
          description:
            "Comprehensive warranty coverage and ongoing maintenance services to keep your systems running smoothly.",
        },
        contract: {
          title: "Contract & In-Person Meetings",
          description:
            "Professional contracts and face-to-face consultations to ensure clear communication and guaranteed deliverables.",
        },
      },
      dialog: {
        title: "Schedule a Consultation",
        fullName: "Full Name *",
        fullNamePlaceholder: "Abdullah Al Mamun",
        phone: "Phone Number *",
        phonePlaceholder: "+974 55600224",
        serviceType: "Service Type *",
        selectService: "Select a service",
        webApp: "Web Application",
        mobileApp: "Mobile Application",
        managementSystem: "Management System",
        ecommerce: "E-Commerce",
        aiAgent: "AI Agent",
        role: "Your Role *",
        rolePlaceholder: "e.g., CEO, Manager, Developer",
        preferredDate: "Preferred Date *",
        preferredTime: "Preferred Time *",
        insideQatar: "Inside Qatar? *",
        yes: "Yes",
        no: "No",
        preferredLanguage: "Preferred Language *",
        english: "English",
        arabic: "Arabic",
        german: "German",
        contactMethod: "Preferred Contact Method *",
        phoneCall: "Phone Call",
        whatsapp: "WhatsApp",
        additionalNotes: "Additional Notes (Optional)",
        notesPlaceholder: "Any specific requirements or questions...",
        scheduling: "Scheduling...",
        confirmConsultation: "Confirm Consultation",
        successTitle: "Consultation Scheduled!",
        successDescription: "We'll contact you at your preferred time.",
        errorTitle: "Error",
        errorDescription: "Failed to schedule consultation. Please try again.",
        genericError: "Something went wrong. Please try again.",
      },
    },

    // Contact Section
    contact: {
      badge: "GET IN TOUCH",
      title1: "Let's Build Something",
      title2: "Amazing Together",
      description:
        "Have a project in mind? We'd love to hear about it. Send us a message and we'll respond within 24 hours.",
      whatsappUs: "WhatsApp Us",
      email: "Email",
      phone: "Phone",
      location: "Location",
      locationDoha: "Doha, QA",
      locationBerlin: "Berlin, DE",
      form: {
        name: "Name *",
        email: "Email",
        company: "Company Name",
        contactNumber: "Contact Number *",
        contactMethod: "Preferred Contact Method *",
        call: "call",
        whatsapp: "WhatsApp",
        preferredDate: "Preferred Date *",
        preferredTime: "Preferred Time *",
        message: "Message *",
        sending: "SENDING...",
        sendMessage: "SEND MESSAGE",
        successMessage:
          "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        errorMessage:
          "Sorry, there was an error sending your message. Please try again.",
      },
    },

    // Footer
    footer: {
      description:
        "Building enterprise-grade digital solutions that synchronize technology with your business vision.",
      services: "SERVICES",
      agency: "AGENCY",
      aboutUs: "About Us",
      contact: "Contact",
      support: "SUPPORT",
      faq: "FAQ",
      legal: "LEGAL",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      cookiePolicy: "Cookie Policy",
      copyright: "© 2025 SYNCHOUSE. ALL RIGHTS RESERVED.",
      privacy: "PRIVACY",
      terms: "TERMS",
      cookies: "COOKIES",
    },

    // Language
    language: {
      en: "English",
      de: "Deutsch",
      ar: "العربية",
    },

    // Legal Pages
    legal: {
      backHome: "Back to Home",
      privacy: {
        title: "Privacy Policy",
        lastUpdated: "Last Updated",
        date: "January 2025",
        sections: {
          intro: {
            title: "Introduction",
            content: "At Synchouse, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.",
          },
          dataCollection: {
            title: "Information We Collect",
            content: "We collect information you provide directly to us, such as your name, email address, phone number, and company information when you fill out contact forms, request consultations, or communicate with us. We may also collect technical information about your device and how you interact with our website.",
          },
          dataUse: {
            title: "How We Use Your Information",
            content: "We use the information we collect to provide, maintain, and improve our services, to communicate with you about our services, to respond to your inquiries, and to send you technical notices and support messages. We may also use your information to analyze trends and improve user experience.",
          },
          dataSecurity: {
            title: "Data Security",
            content: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.",
          },
          contact: {
            title: "Contact Us",
            content: "If you have any questions about this Privacy Policy, please contact us at synchouse26@gmail.com or call us at +974 55600224.",
          },
        },
      },
      terms: {
        title: "Terms of Service",
        lastUpdated: "Last Updated",
        date: "January 2025",
        sections: {
          acceptance: {
            title: "Acceptance of Terms",
            content: "By accessing and using Synchouse's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
          },
          services: {
            title: "Our Services",
            content: "Synchouse provides software development services including but not limited to ERP systems, CRM solutions, e-commerce platforms, mobile applications, AI agents, and appointment management systems. All services are provided subject to separate service agreements.",
          },
          intellectual: {
            title: "Intellectual Property",
            content: "All content, features, and functionality on our website, including but not limited to text, graphics, logos, and software, are owned by Synchouse and are protected by international copyright, trademark, and other intellectual property laws.",
          },
          liability: {
            title: "Limitation of Liability",
            content: "Synchouse shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services. Our total liability shall not exceed the amount paid by you for our services.",
          },
          changes: {
            title: "Changes to Terms",
            content: "We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on our website. Your continued use of our services after such modifications constitutes acceptance of the updated terms.",
          },
        },
      },
      cookies: {
        title: "Cookie Policy",
        lastUpdated: "Last Updated",
        date: "January 2025",
        sections: {
          what: {
            title: "What Are Cookies",
            content: "Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our website.",
          },
          how: {
            title: "How We Use Cookies",
            content: "We use cookies to remember your language preferences, analyze website traffic and performance, improve our services, and provide personalized content. We also use cookies for essential website functionality.",
          },
          types: {
            title: "Types of Cookies We Use",
            content: "Essential cookies are necessary for the website to function properly. Analytics cookies help us understand how visitors interact with our website. Preference cookies remember your settings and choices. We do not use advertising cookies.",
          },
          manage: {
            title: "Managing Cookies",
            content: "You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website. You can also delete cookies that have already been stored on your device.",
          },
        },
      },
    },

    // FAQ
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our services and processes.",
      stillHaveQuestions: "Still Have Questions?",
      contactUs: "Can't find the answer you're looking for? Our team is here to help.",
      contactButton: "Contact Us",
      questions: [
        {
          question: "What services does Synchouse offer?",
          answer: "We offer a comprehensive range of software development services including ERP systems, CRM solutions, e-commerce platforms, mobile applications (iOS and Android), AI agents and automation, and appointment management systems. Each solution is tailored to meet your specific business needs.",
        },
        {
          question: "How long does a typical project take?",
          answer: "Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while a comprehensive ERP system could take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.",
        },
        {
          question: "Do you provide ongoing support and maintenance?",
          answer: "Yes, we offer comprehensive warranty coverage and ongoing maintenance services for all our projects. This includes bug fixes, security updates, performance optimization, and technical support to ensure your systems run smoothly.",
        },
        {
          question: "What is your development process?",
          answer: "We follow an agile development methodology that includes discovery and planning, design, development, testing, deployment, and ongoing support. We maintain clear communication throughout and provide regular progress updates.",
        },
        {
          question: "Do you offer in-person consultations?",
          answer: "Yes, we offer both in-person and virtual consultations. For clients in Qatar, we can arrange face-to-face meetings. For international clients, we conduct consultations via video call. All projects include professional contracts with clear deliverables.",
        },
        {
          question: "What technologies do you use?",
          answer: "We use modern, industry-standard technologies including React, Next.js, Node.js, Python, and various cloud platforms. We select the best technology stack based on your project requirements to ensure scalability, security, and performance.",
        },
        {
          question: "How do I get started with a project?",
          answer: "Simply schedule a free consultation through our website or contact us directly. We'll discuss your requirements, provide recommendations, and create a detailed proposal including timeline and pricing. Once approved, we'll begin the development process.",
        },
      ],
    },
  },

  de: {
    // Header
    header: {
      services: "Leistungen",
      whyUs: "Warum Wir",
      contact: "Kontakt",
      getStarted: "Loslegen",
    },

    // Hero Section
    hero: {
      title1: "Digitale Lösungen",
      title2: "Synchronisiert",
      description:
        "Wir entwickeln unternehmenstaugliche Softwarelösungen, die Ihr Geschäft transformieren. Von ERP-Systemen bis zu KI-Agenten - wir synchronisieren Technologie mit Ihrer Vision.",
      startProject: "Projekt Starten",
      viewServices: "Leistungen Ansehen",
      stats: {
        projects: "Projekte",
        clients: "Kunden",
        years: "Jahre",
        success: "Erfolg",
      },
    },

    // Services Section
    services: {
      badge: "Unsere Leistungen",
      title1: "Digitale Lösungen für",
      title2: "Moderne Unternehmen",
      description:
        "Wir liefern modernste Softwarelösungen, die auf Ihre individuellen Geschäftsanforderungen zugeschnitten sind",
      items: {
        erp: {
          title: "ERP-Systeme",
          description:
            "Umfassende Enterprise-Resource-Planning-Lösungen, die Ihre Abläufe optimieren und die Effizienz steigern.",
        },
        crm: {
          title: "CRM-Lösungen",
          description:
            "Kundenbeziehungsmanagement-Plattformen, die Ihnen helfen, dauerhafte Beziehungen aufzubauen und Wachstum zu fördern.",
        },
        ecommerce: {
          title: "E-Commerce",
          description:
            "Skalierbare Online-Shops mit nahtloser Zahlungsintegration und außergewöhnlicher Benutzererfahrung.",
        },
        mobile: {
          title: "Mobile Apps",
          description:
            "Native und plattformübergreifende mobile Anwendungen, die Nutzer auf iOS und Android begeistern.",
        },
        ai: {
          title: "KI-Agenten",
          description:
            "Intelligente Automatisierung und KI-gestützte Lösungen, die Ihre Arbeitsweise und Kundenbetreuung transformieren.",
        },
        appointment: {
          title: "Terminbuchungssysteme",
          description:
            "Intelligente Terminplanungs- und Buchungsplattformen, die das Zeitmanagement optimieren und Ausfälle reduzieren.",
        },
      },
    },

    // Why Us Section
    whyUs: {
      badge: "WARUM WIR",
      title1: "FÜR LEISTUNG GEBAUT",
      title2: "FÜR ERFOLG DESIGNED",
      description:
        "Wir kombinieren technische Exzellenz mit Geschäftssinn, um Lösungen zu liefern, die echte Ergebnisse erzielen",
      cta: {
        title: "BEREIT, IHR UNTERNEHMEN ZU TRANSFORMIEREN?",
        description:
          "Lassen Sie uns besprechen, wie wir Ihnen helfen können, Ihre digitalen Ziele zu erreichen",
        button: "BERATUNG VEREINBAREN",
      },
      reasons: {
        fastDelivery: {
          title: "Schnelle Lieferung",
          description:
            "Agiler Entwicklungsprozess gewährleistet schnelle Bereitstellung ohne Qualitätseinbußen.",
        },
        security: {
          title: "Enterprise-Sicherheit",
          description:
            "Sicherheitsprotokolle auf Bankniveau schützen Ihre Daten und das Vertrauen Ihrer Kunden.",
        },
        team: {
          title: "Expertenteam",
          description:
            "Erfahrene Entwickler und Designer mit nachgewiesener Erfolgsbilanz in Unternehmenssoftware.",
        },
        scalable: {
          title: "Skalierbare Lösungen",
          description:
            "Zukunftssichere Architektur, die mit Ihren Geschäftsanforderungen wächst.",
        },
        warranty: {
          title: "Garantie & Wartung",
          description:
            "Umfassende Garantieabdeckung und laufende Wartungsdienste, um Ihre Systeme reibungslos am Laufen zu halten.",
        },
        contract: {
          title: "Vertrag & Persönliche Meetings",
          description:
            "Professionelle Verträge und persönliche Beratungen für klare Kommunikation und garantierte Ergebnisse.",
        },
      },
      dialog: {
        title: "Beratung Vereinbaren",
        fullName: "Vollständiger Name *",
        fullNamePlaceholder: "Max Mustermann",
        phone: "Telefonnummer *",
        phonePlaceholder: "+49 123 456789",
        serviceType: "Dienstleistungsart *",
        selectService: "Dienst auswählen",
        webApp: "Web-Anwendung",
        mobileApp: "Mobile Anwendung",
        managementSystem: "Management-System",
        ecommerce: "E-Commerce",
        aiAgent: "KI-Agent",
        role: "Ihre Rolle *",
        rolePlaceholder: "z.B. CEO, Manager, Entwickler",
        preferredDate: "Bevorzugtes Datum *",
        preferredTime: "Bevorzugte Uhrzeit *",
        insideQatar: "In Katar? *",
        yes: "Ja",
        no: "Nein",
        preferredLanguage: "Bevorzugte Sprache *",
        english: "Englisch",
        arabic: "Arabisch",
        german: "Deutsch",
        contactMethod: "Bevorzugte Kontaktmethode *",
        phoneCall: "Telefonanruf",
        whatsapp: "WhatsApp",
        additionalNotes: "Zusätzliche Anmerkungen (Optional)",
        notesPlaceholder: "Spezifische Anforderungen oder Fragen...",
        scheduling: "Wird geplant...",
        confirmConsultation: "Beratung Bestätigen",
        successTitle: "Beratung Geplant!",
        successDescription: "Wir kontaktieren Sie zur gewünschten Zeit.",
        errorTitle: "Fehler",
        errorDescription:
          "Beratung konnte nicht geplant werden. Bitte versuchen Sie es erneut.",
        genericError:
          "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
      },
    },

    // Contact Section
    contact: {
      badge: "KONTAKTIEREN SIE UNS",
      title1: "Lassen Sie uns etwas",
      title2: "Großartiges Bauen",
      description:
        "Haben Sie ein Projekt im Sinn? Wir würden gerne davon hören. Senden Sie uns eine Nachricht und wir antworten innerhalb von 24 Stunden.",
      whatsappUs: "WhatsApp Schreiben",
      email: "E-Mail",
      phone: "Telefon",
      location: "Standort",
      locationDoha: "Doha, QA",
      locationBerlin: "Berlin, DE",
      form: {
        name: "Name *",
        email: "E-Mail",
        company: "Firmenname",
        contactNumber: "Kontaktnummer *",
        contactMethod: "Bevorzugte Kontaktmethode *",
        call: "Anruf",
        whatsapp: "WhatsApp",
        preferredDate: "Bevorzugtes Datum *",
        preferredTime: "Bevorzugte Uhrzeit *",
        message: "Nachricht *",
        sending: "WIRD GESENDET...",
        sendMessage: "NACHRICHT SENDEN",
        successMessage:
          "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei Ihnen.",
        errorMessage:
          "Entschuldigung, beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      },
    },

    // Footer
    footer: {
      description:
        "Wir entwickeln unternehmenstaugliche digitale Lösungen, die Technologie mit Ihrer Geschäftsvision synchronisieren.",
      services: "LEISTUNGEN",
      agency: "AGENTUR",
      aboutUs: "Über Uns",
      contact: "Kontakt",
      support: "SUPPORT",
      faq: "FAQ",
      legal: "RECHTLICHES",
      privacyPolicy: "Datenschutzerklärung",
      termsOfService: "Nutzungsbedingungen",
      cookiePolicy: "Cookie-Richtlinie",
      copyright: "© 2025 SYNCHOUSE. ALLE RECHTE VORBEHALTEN.",
      privacy: "DATENSCHUTZ",
      terms: "AGB",
      cookies: "COOKIES",
    },

    // Language
    language: {
      en: "English",
      de: "Deutsch",
      ar: "العربية",
    },

    // Legal Pages
    legal: {
      backHome: "Zurück zur Startseite",
      privacy: {
        title: "Datenschutzerklärung",
        lastUpdated: "Zuletzt aktualisiert",
        date: "Januar 2025",
        sections: {
          intro: {
            title: "Einleitung",
            content: "Bei Synchouse verpflichten wir uns zum Schutz Ihrer Privatsphäre. Diese Datenschutzerklärung erläutert, wie wir Ihre Informationen erfassen, verwenden, offenlegen und schützen, wenn Sie unsere Website besuchen oder unsere Dienste nutzen.",
          },
          dataCollection: {
            title: "Welche Daten wir erfassen",
            content: "Wir erfassen Informationen, die Sie uns direkt mitteilen, wie Ihren Namen, Ihre E-Mail-Adresse, Telefonnummer und Firmeninformationen, wenn Sie Kontaktformulare ausfüllen, Beratungen anfordern oder mit uns kommunizieren.",
          },
          dataUse: {
            title: "Wie wir Ihre Daten verwenden",
            content: "Wir verwenden die gesammelten Informationen, um unsere Dienste bereitzustellen, zu pflegen und zu verbessern, um mit Ihnen über unsere Dienste zu kommunizieren, auf Ihre Anfragen zu antworten und Ihnen technische Hinweise zu senden.",
          },
          dataSecurity: {
            title: "Datensicherheit",
            content: "Wir setzen angemessene technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre persönlichen Daten vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung zu schützen.",
          },
          contact: {
            title: "Kontakt",
            content: "Bei Fragen zu dieser Datenschutzerklärung kontaktieren Sie uns bitte unter synchouse26@gmail.com oder rufen Sie uns an unter +974 55600224.",
          },
        },
      },
      terms: {
        title: "Nutzungsbedingungen",
        lastUpdated: "Zuletzt aktualisiert",
        date: "Januar 2025",
        sections: {
          acceptance: {
            title: "Annahme der Bedingungen",
            content: "Durch den Zugriff auf und die Nutzung der Website und Dienste von Synchouse akzeptieren Sie diese Nutzungsbedingungen. Wenn Sie diesen Bedingungen nicht zustimmen, nutzen Sie bitte unsere Dienste nicht.",
          },
          services: {
            title: "Unsere Dienstleistungen",
            content: "Synchouse bietet Softwareentwicklungsdienstleistungen an, einschließlich ERP-Systeme, CRM-Lösungen, E-Commerce-Plattformen, Mobile Apps, KI-Agenten und Terminverwaltungssysteme.",
          },
          intellectual: {
            title: "Geistiges Eigentum",
            content: "Alle Inhalte, Funktionen und Funktionalitäten auf unserer Website sind Eigentum von Synchouse und durch internationale Urheberrechts-, Marken- und andere Gesetze zum Schutz geistigen Eigentums geschützt.",
          },
          liability: {
            title: "Haftungsbeschränkung",
            content: "Synchouse haftet nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden, die aus Ihrer Nutzung oder Unfähigkeit zur Nutzung unserer Dienste resultieren.",
          },
          changes: {
            title: "Änderungen der Bedingungen",
            content: "Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Wir werden Sie über Änderungen informieren, indem wir die neuen Bedingungen auf unserer Website veröffentlichen.",
          },
        },
      },
      cookies: {
        title: "Cookie-Richtlinie",
        lastUpdated: "Zuletzt aktualisiert",
        date: "Januar 2025",
        sections: {
          what: {
            title: "Was sind Cookies",
            content: "Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie unsere Website besuchen. Sie helfen uns, Ihnen ein besseres Erlebnis zu bieten, indem sie Ihre Präferenzen speichern.",
          },
          how: {
            title: "Wie wir Cookies verwenden",
            content: "Wir verwenden Cookies, um Ihre Spracheinstellungen zu speichern, den Website-Traffic zu analysieren, unsere Dienste zu verbessern und personalisierte Inhalte bereitzustellen.",
          },
          types: {
            title: "Arten von Cookies",
            content: "Essentielle Cookies sind für die ordnungsgemäße Funktion der Website erforderlich. Analyse-Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren. Präferenz-Cookies speichern Ihre Einstellungen.",
          },
          manage: {
            title: "Cookies verwalten",
            content: "Sie können Cookies über Ihre Browsereinstellungen kontrollieren und verwalten. Bitte beachten Sie, dass das Deaktivieren bestimmter Cookies die Funktionalität unserer Website beeinträchtigen kann.",
          },
        },
      },
    },

    // FAQ
    faq: {
      title: "Häufig gestellte Fragen",
      subtitle: "Finden Sie Antworten auf häufige Fragen zu unseren Dienstleistungen und Prozessen.",
      stillHaveQuestions: "Noch Fragen?",
      contactUs: "Sie finden nicht die Antwort, die Sie suchen? Unser Team hilft Ihnen gerne.",
      contactButton: "Kontaktieren Sie uns",
      questions: [
        {
          question: "Welche Dienstleistungen bietet Synchouse an?",
          answer: "Wir bieten ein umfassendes Spektrum an Softwareentwicklungsdienstleistungen, darunter ERP-Systeme, CRM-Lösungen, E-Commerce-Plattformen, Mobile Apps (iOS und Android), KI-Agenten und Automatisierung sowie Terminverwaltungssysteme.",
        },
        {
          question: "Wie lange dauert ein typisches Projekt?",
          answer: "Die Projektzeiten variieren je nach Komplexität und Umfang. Eine einfache Website kann 2-4 Wochen dauern, während ein umfassendes ERP-System 3-6 Monate in Anspruch nehmen kann.",
        },
        {
          question: "Bieten Sie laufenden Support und Wartung an?",
          answer: "Ja, wir bieten umfassende Garantie und laufende Wartungsdienste für alle unsere Projekte. Dies umfasst Fehlerbehebungen, Sicherheitsupdates, Leistungsoptimierung und technischen Support.",
        },
        {
          question: "Wie ist Ihr Entwicklungsprozess?",
          answer: "Wir folgen einer agilen Entwicklungsmethodik, die Entdeckung und Planung, Design, Entwicklung, Tests, Deployment und laufenden Support umfasst.",
        },
        {
          question: "Bieten Sie persönliche Beratungen an?",
          answer: "Ja, wir bieten sowohl persönliche als auch virtuelle Beratungen an. Für Kunden in Katar können wir persönliche Treffen arrangieren. Für internationale Kunden führen wir Beratungen per Videoanruf durch.",
        },
        {
          question: "Welche Technologien verwenden Sie?",
          answer: "Wir verwenden moderne, branchenübliche Technologien wie React, Next.js, Node.js, Python und verschiedene Cloud-Plattformen.",
        },
        {
          question: "Wie starte ich ein Projekt?",
          answer: "Vereinbaren Sie einfach eine kostenlose Beratung über unsere Website oder kontaktieren Sie uns direkt. Wir besprechen Ihre Anforderungen und erstellen einen detaillierten Vorschlag.",
        },
      ],
    },
  },

  ar: {
    // Header
    header: {
      services: "خدماتنا",
      whyUs: "مميزاتنا",
      contact: "تواصل معنا",
      getStarted: "ابدأ الآن",
    },

    // Hero Section
    hero: {
      title1: "نصنع لك",
      title2: "المستقبل الرقمي",
      description:
        "نطوّر أنظمة برمجية احترافية تنقل أعمالك لمستوى جديد. سواء كنت تحتاج نظام إدارة متكامل أو حلول ذكاء اصطناعي، نحن شريكك التقني الأمثل.",
      startProject: "ابدأ مشروعك",
      viewServices: "تصفح خدماتنا",
      stats: {
        projects: "مشروع",
        clients: "عميل",
        years: "سنوات خبرة",
        success: "نسبة النجاح",
      },
    },

    // Services Section
    services: {
      badge: "ماذا نقدم",
      title1: "خدمات تقنية",
      title2: "بمعايير عالمية",
      description:
        "نصمم حلولاً برمجية مخصصة تناسب طبيعة عملك وتحقق أهدافك",
      items: {
        erp: {
          title: "أنظمة إدارة الموارد",
          description:
            "أنظمة متكاملة تربط جميع أقسام شركتك وتسهّل إدارة العمليات اليومية بكفاءة عالية.",
        },
        crm: {
          title: "إدارة العملاء",
          description:
            "منصات ذكية تساعدك على متابعة عملائك وتقوية علاقتك بهم وزيادة مبيعاتك.",
        },
        ecommerce: {
          title: "المتاجر الإلكترونية",
          description:
            "متاجر احترافية بتصميم جذاب وتجربة شراء سلسة تحول زوارك إلى عملاء دائمين.",
        },
        mobile: {
          title: "تطبيقات الجوال",
          description:
            "تطبيقات متميزة للآيفون والأندرويد تضع خدماتك في جيب كل عميل.",
        },
        ai: {
          title: "حلول الذكاء الاصطناعي",
          description:
            "تقنيات ذكية تؤتمت أعمالك وتخدم عملاءك على مدار الساعة بدون تدخل بشري.",
        },
        appointment: {
          title: "أنظمة الحجوزات",
          description:
            "منصات حجز متطورة تنظم مواعيدك وتقلل الإلغاءات وتوفر وقتك ووقت عملائك.",
        },
      },
    },

    // Why Us Section
    whyUs: {
      badge: "لماذا سينك هاوس",
      title1: "جودة في التنفيذ",
      title2: "التزام بالنتائج",
      description:
        "خبرة تقنية عميقة مع فهم حقيقي لاحتياجات السوق، نضمن لك نتائج ملموسة",
      cta: {
        title: "جاهز تنطلق بمشروعك؟",
        description: "احجز استشارة مجانية ودعنا نساعدك في تحقيق رؤيتك",
        button: "احجز موعدك الآن",
      },
      reasons: {
        fastDelivery: {
          title: "سرعة في التسليم",
          description:
            "نعمل بمنهجية احترافية تضمن تسليم مشروعك في الوقت المحدد مع الحفاظ على أعلى جودة.",
        },
        security: {
          title: "حماية متقدمة",
          description:
            "نطبق أعلى معايير الأمان لحماية بياناتك وبيانات عملائك من أي اختراق.",
        },
        team: {
          title: "فريق متخصص",
          description:
            "مهندسون ومصممون بخبرات متراكمة في تطوير أنظمة الشركات الكبرى.",
        },
        scalable: {
          title: "قابلية التوسع",
          description:
            "نبني أنظمة مرنة تكبر مع نمو أعمالك بدون الحاجة لإعادة البناء.",
        },
        warranty: {
          title: "ضمان وصيانة",
          description:
            "دعم فني مستمر وضمان شامل يحافظ على عمل أنظمتك بكفاءة دائمة.",
        },
        contract: {
          title: "عقود واضحة",
          description:
            "اتفاقيات رسمية واجتماعات مباشرة تضمن حقوقك وتوضح كل التفاصيل من البداية.",
        },
      },
      dialog: {
        title: "احجز استشارتك",
        fullName: "الاسم الكامل *",
        fullNamePlaceholder: "محمد أحمد",
        phone: "رقم الجوال *",
        phonePlaceholder: "+974 55600224",
        serviceType: "الخدمة المطلوبة *",
        selectService: "اختر الخدمة",
        webApp: "موقع أو تطبيق ويب",
        mobileApp: "تطبيق جوال",
        managementSystem: "نظام إدارة",
        ecommerce: "متجر إلكتروني",
        aiAgent: "حلول ذكاء اصطناعي",
        role: "منصبك الوظيفي *",
        rolePlaceholder: "مثال: صاحب العمل، مدير، مطور",
        preferredDate: "التاريخ المناسب *",
        preferredTime: "الوقت المناسب *",
        insideQatar: "هل أنت في قطر؟ *",
        yes: "نعم",
        no: "لا",
        preferredLanguage: "لغة التواصل *",
        english: "الإنجليزية",
        arabic: "العربية",
        german: "الألمانية",
        contactMethod: "طريقة التواصل *",
        phoneCall: "اتصال هاتفي",
        whatsapp: "واتساب",
        additionalNotes: "ملاحظات إضافية (اختياري)",
        notesPlaceholder: "أخبرنا المزيد عن مشروعك أو استفساراتك...",
        scheduling: "جاري الحجز...",
        confirmConsultation: "تأكيد الحجز",
        successTitle: "تم الحجز بنجاح!",
        successDescription: "سنتواصل معك في الموعد المحدد.",
        errorTitle: "حدث خطأ",
        errorDescription: "لم نتمكن من إتمام الحجز، حاول مرة أخرى.",
        genericError: "حدث خطأ غير متوقع، يرجى المحاولة لاحقاً.",
      },
    },

    // Contact Section
    contact: {
      badge: "تواصل معنا",
      title1: "لنبدأ العمل",
      title2: "على مشروعك",
      description:
        "عندك فكرة أو مشروع؟ راسلنا الآن وسنرد عليك خلال ٢٤ ساعة.",
      whatsappUs: "راسلنا واتساب",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      location: "الموقع",
      locationDoha: "الدوحة، قطر",
      locationBerlin: "برلين، ألمانيا",
      form: {
        name: "الاسم *",
        email: "البريد الإلكتروني",
        company: "اسم الشركة",
        contactNumber: "رقم الجوال *",
        contactMethod: "طريقة التواصل المفضلة *",
        call: "اتصال",
        whatsapp: "واتساب",
        preferredDate: "التاريخ المناسب *",
        preferredTime: "الوقت المناسب *",
        message: "رسالتك *",
        sending: "جاري الإرسال...",
        sendMessage: "أرسل الرسالة",
        successMessage:
          "شكراً لتواصلك! وصلتنا رسالتك وسنرد عليك قريباً.",
        errorMessage:
          "عذراً، حدث خطأ في الإرسال. حاول مرة أخرى.",
      },
    },

    // Footer
    footer: {
      description:
        "شريكك التقني لبناء حلول رقمية متكاملة تواكب طموحاتك وتحقق أهداف عملك.",
      services: "خدماتنا",
      agency: "الشركة",
      aboutUs: "من نحن",
      contact: "تواصل معنا",
      support: "الدعم",
      faq: "الأسئلة الشائعة",
      legal: "القانونية",
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الاستخدام",
      cookiePolicy: "سياسة ملفات الارتباط",
      copyright: "© ٢٠٢٥ سينك هاوس. جميع الحقوق محفوظة.",
      privacy: "الخصوصية",
      terms: "الشروط",
      cookies: "ملفات الارتباط",
    },

    // Language
    language: {
      en: "English",
      de: "Deutsch",
      ar: "العربية",
    },

    // Legal Pages
    legal: {
      backHome: "العودة للرئيسية",
      privacy: {
        title: "سياسة الخصوصية",
        lastUpdated: "آخر تحديث",
        date: "يناير ٢٠٢٥",
        sections: {
          intro: {
            title: "مقدمة",
            content: "في سينك هاوس، نلتزم بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيف نجمع ونستخدم ونحمي معلوماتك عند زيارة موقعنا أو استخدام خدماتنا.",
          },
          dataCollection: {
            title: "البيانات التي نجمعها",
            content: "نجمع المعلومات التي تقدمها لنا مباشرة مثل اسمك وبريدك الإلكتروني ورقم هاتفك ومعلومات شركتك عند ملء نماذج التواصل أو طلب استشارة أو التواصل معنا.",
          },
          dataUse: {
            title: "كيف نستخدم بياناتك",
            content: "نستخدم المعلومات المجمعة لتقديم خدماتنا وتحسينها والتواصل معك بشأن خدماتنا والرد على استفساراتك وإرسال الإشعارات التقنية ورسائل الدعم.",
          },
          dataSecurity: {
            title: "أمان البيانات",
            content: "نطبق إجراءات أمنية تقنية وتنظيمية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو التدمير.",
          },
          contact: {
            title: "تواصل معنا",
            content: "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، تواصل معنا على synchouse26@gmail.com أو اتصل بنا على 55600224 974+.",
          },
        },
      },
      terms: {
        title: "شروط الاستخدام",
        lastUpdated: "آخر تحديث",
        date: "يناير ٢٠٢٥",
        sections: {
          acceptance: {
            title: "قبول الشروط",
            content: "باستخدامك لموقع وخدمات سينك هاوس، فإنك توافق على الالتزام بشروط الاستخدام هذه. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدماتنا.",
          },
          services: {
            title: "خدماتنا",
            content: "تقدم سينك هاوس خدمات تطوير البرمجيات بما في ذلك أنظمة إدارة الموارد وإدارة العملاء والمتاجر الإلكترونية وتطبيقات الجوال وحلول الذكاء الاصطناعي وأنظمة الحجوزات.",
          },
          intellectual: {
            title: "الملكية الفكرية",
            content: "جميع المحتويات والميزات والوظائف على موقعنا مملوكة لسينك هاوس ومحمية بموجب قوانين حقوق النشر والعلامات التجارية وقوانين الملكية الفكرية الدولية.",
          },
          liability: {
            title: "حدود المسؤولية",
            content: "لن تكون سينك هاوس مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية ناتجة عن استخدامك أو عدم قدرتك على استخدام خدماتنا.",
          },
          changes: {
            title: "تغييرات الشروط",
            content: "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنخطرك بأي تغييرات من خلال نشر الشروط الجديدة على موقعنا.",
          },
        },
      },
      cookies: {
        title: "سياسة ملفات الارتباط",
        lastUpdated: "آخر تحديث",
        date: "يناير ٢٠٢٥",
        sections: {
          what: {
            title: "ما هي ملفات الارتباط",
            content: "ملفات الارتباط هي ملفات نصية صغيرة تُخزن على جهازك عند زيارة موقعنا. تساعدنا في تقديم تجربة أفضل لك من خلال تذكر تفضيلاتك.",
          },
          how: {
            title: "كيف نستخدم ملفات الارتباط",
            content: "نستخدم ملفات الارتباط لتذكر إعدادات لغتك وتحليل حركة الموقع وتحسين خدماتنا وتقديم محتوى مخصص.",
          },
          types: {
            title: "أنواع ملفات الارتباط",
            content: "ملفات الارتباط الأساسية ضرورية لعمل الموقع بشكل صحيح. ملفات التحليلات تساعدنا على فهم كيفية تفاعل الزوار مع موقعنا. ملفات التفضيلات تتذكر إعداداتك.",
          },
          manage: {
            title: "إدارة ملفات الارتباط",
            content: "يمكنك التحكم في ملفات الارتباط وإدارتها من خلال إعدادات متصفحك. يرجى ملاحظة أن تعطيل بعض ملفات الارتباط قد يؤثر على وظائف موقعنا.",
          },
        },
      },
    },

    // FAQ
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "اعثر على إجابات للأسئلة المتكررة حول خدماتنا وآلية العمل.",
      stillHaveQuestions: "لديك أسئلة أخرى؟",
      contactUs: "لم تجد الإجابة التي تبحث عنها؟ فريقنا جاهز لمساعدتك.",
      contactButton: "تواصل معنا",
      questions: [
        {
          question: "ما الخدمات التي تقدمها سينك هاوس؟",
          answer: "نقدم مجموعة شاملة من خدمات تطوير البرمجيات تشمل أنظمة إدارة الموارد (ERP) وإدارة العملاء (CRM) والمتاجر الإلكترونية وتطبيقات الجوال للآيفون والأندرويد وحلول الذكاء الاصطناعي وأنظمة الحجوزات.",
        },
        {
          question: "كم يستغرق تنفيذ المشروع؟",
          answer: "تختلف مدة المشاريع حسب حجمها وتعقيدها. موقع بسيط قد يستغرق ٢-٤ أسابيع، بينما نظام إدارة موارد متكامل قد يحتاج ٣-٦ أشهر. نقدم جدول زمني مفصل في الاستشارة الأولى.",
        },
        {
          question: "هل توفرون دعم وصيانة مستمرة؟",
          answer: "نعم، نقدم ضمان شامل وخدمات صيانة مستمرة لجميع مشاريعنا. يشمل ذلك إصلاح الأعطال وتحديثات الأمان وتحسين الأداء والدعم الفني.",
        },
        {
          question: "ما هي منهجية التطوير لديكم؟",
          answer: "نتبع منهجية التطوير الرشيق (Agile) التي تشمل مراحل الاكتشاف والتخطيط والتصميم والتطوير والاختبار والإطلاق والدعم المستمر مع تواصل دائم وتحديثات منتظمة.",
        },
        {
          question: "هل توفرون استشارات حضورية؟",
          answer: "نعم، نقدم استشارات حضورية وعن بُعد. للعملاء في قطر نرتب لقاءات شخصية. للعملاء الدوليين نجري الاستشارات عبر مكالمات الفيديو. جميع المشاريع تتضمن عقود رسمية.",
        },
        {
          question: "ما التقنيات التي تستخدمونها؟",
          answer: "نستخدم أحدث التقنيات المعتمدة عالمياً مثل React و Next.js و Node.js و Python ومنصات سحابية متعددة. نختار التقنية الأنسب حسب متطلبات مشروعك.",
        },
        {
          question: "كيف أبدأ مشروعي معكم؟",
          answer: "احجز استشارة مجانية من موقعنا أو تواصل معنا مباشرة. سنناقش متطلباتك ونقدم توصياتنا ونعد عرض سعر مفصل يشمل الجدول الزمني. بعد الموافقة نبدأ العمل فوراً.",
        },
      ],
    },
  },
} as const;

export type Translations = typeof translations.en;
