/**
 * Ewana Environmental Consulting Ltd
 * Main Application Script (app.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================
     1. STICKY HEADER & ACTIVE NAVIGATION
  ========================================================== */
  const header = document.querySelector(".header-main");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");
  const sections = document.querySelectorAll("section[id], div[id]");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

    // Scrollspy for active nav link
    let currentId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute("id");
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }
  });

  /* ==========================================================
     2. MOBILE MENU DRAWER
  ========================================================== */
  const hamburger = document.querySelector(".hamburger");
  const mobileDrawer = document.querySelector(".mobile-drawer");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const drawerClose = document.querySelector(".drawer-close");
  const drawerLinks = document.querySelectorAll(".drawer-nav a");

  function openMobileMenu() {
    mobileDrawer?.classList.add("open");
    drawerOverlay?.classList.add("active");
    hamburger?.classList.add("is-active");
    document.body.classList.add("no-scroll");
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove("open");
    drawerOverlay?.classList.remove("active");
    hamburger?.classList.remove("is-active");
    document.body.classList.remove("no-scroll");
  }

  function toggleMobileMenu() {
    if (mobileDrawer?.classList.contains("open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  hamburger?.addEventListener("click", toggleMobileMenu);
  drawerClose?.addEventListener("click", closeMobileMenu);
  drawerOverlay?.addEventListener("click", closeMobileMenu);

  drawerLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  /* ==========================================================
     3. SMOOTH SCROLLING WITH OFFSET
  ========================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.length < 2) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  /* ==========================================================
     4. SERVICES DATA, TAB FILTERING & MODAL
  ========================================================== */
  const servicesData = [
    {
      id: "esia",
      category: "management",
      title: "Environmental & Social Impact Assessments (ESIA / ESIS)",
      tagline: "Comprehensive baseline, impact modeling, and regulatory compliance.",
      badge: "ZEMA Mandated",
      summary: "Full-scope Environmental and Social Impact Assessments, Strategic Environmental Assessments (SEA), and Environmental Project Briefs (EPB) authored to IFC and ZEMA statutory requirements.",
      deliverables: [
        "Environmental & Social Impact Statements (ESIS)",
        "Strategic Environmental Assessments (SEA)",
        "Environmental Project Briefs (EPB)",
        "Baseline Ecological & Socio-Economic Studies",
        "Resettlement Action Plans (RAP) & Livelihood Restoration (LRP)",
        "Public Consultations & Community Disclosure Hearings"
      ],
      standards: "ZEMA Act 2011, IFC Performance Standards, World Bank EHS",
      image: "assets/images/soil-remediation.jpg"
    },
    {
      id: "monitoring",
      category: "monitoring",
      title: "Environmental Monitoring & Lab Testing",
      tagline: "Physical, chemical, radiological, and microbial analysis.",
      badge: "In-Situ & Lab",
      summary: "State-of-the-art field monitoring and accredited laboratory testing of ambient air, stack emissions, surface/groundwater, soil contamination, noise, and industrial vibrations.",
      deliverables: [
        "Ambient Air & Flue Stack Emissions Monitoring",
        "Groundwater, Borehole & Aquifer Quality Testing",
        "Industrial Effluent Testing & Discharge Compliance",
        "Noise Level & Structural Vibration Profiling",
        "Heavy Metals & Geochemical Soil Sampling",
        "Quarterly & Annual ZEMA Regulatory Returns"
      ],
      standards: "ZEMA Statutory Limits, WHO Drinking Water, ISO 17025 Labs",
      image: "assets/images/water-sampling.jpg"
    },
    {
      id: "hazardous",
      category: "waste",
      title: "Hazardous Materials & Waste Management",
      tagline: "Safe containment, remediation, and licensed transport.",
      badge: "High Risk",
      summary: "End-to-end hazardous waste logistics, drum encapsulation, asbestos/lead paint abatement, emergency oil spill response, and biological/chemical decontamination across mining and industrial sites.",
      deliverables: [
        "Hazardous Material Handling, Transport & Disposal",
        "Specialized Containment & Drum Encapsulation",
        "Contaminated Soil & Groundwater In-Situ Bioremediation",
        "Asbestos & Toxic Substance Abatement",
        "Industrial Oil Spill Response & Emergency Containment",
        "Biomedical & Radioactive Waste Secure Handling"
      ],
      standards: "ZEMA Hazardous Waste Regs, Basel Convention, OHS 2025",
      image: "assets/images/hazardous-waste.jpg"
    },
    {
      id: "solid-waste",
      category: "waste",
      title: "Solid Waste Management & Skip Hire",
      tagline: "Integrated municipal, commercial, and industrial collection.",
      badge: "Circular Economy",
      summary: "Integrated waste collection and haulage, skip bin and receptacle hire, material recovery facilities (MRF), certified goods destruction, and composting programs.",
      deliverables: [
        "Industrial & Construction Waste Haulage",
        "Supplying & Hiring Waste Bins and Skips",
        "Commercial & Residential Scheduled Collection",
        "Certified Goods Destruction & Safe Disposal",
        "Recycling, Segregation & Material Recovery",
        "Organic Waste Composting Solutions"
      ],
      standards: "Local Council By-laws, ZEMA Waste Management Act",
      image: "assets/images/ecology-sustainability.jpg"
    },
    {
      id: "water-resources",
      category: "water",
      title: "Water Resources & Hydrological Engineering",
      tagline: "Aquifer modeling, water treatment, and drainage planning.",
      badge: "Engineering",
      summary: "Hydrogeological flow modeling with MODFLOW, stormwater drainage planning, coagulation and sedimentation advisory for treatment plants, and watershed conservation.",
      deliverables: [
        "Water Supply, Treatment Plant & Distribution Advisory",
        "Groundwater Modeling (MODFLOW) & Well Logging",
        "Stormwater Drainage & Flood Water Risk Modeling",
        "Industrial Effluent Treatment Ponds Optimization",
        "Wetland & Watershed Conservation Management",
        "Sedimentation & Coagulation Process Control"
      ],
      standards: "WARMA Regulations, EIZ Engineering Standards, ZABS",
      image: "assets/images/water-treatment.jpg"
    },
    {
      id: "climate-esg",
      category: "climate",
      title: "Climate Change, Carbon & ESG Advisory",
      tagline: "Quantifying emissions and driving sustainable corporate resilience.",
      badge: "ESG Strategy",
      summary: "Corporate sustainability strategies, GHG accounting, climate vulnerability risk assessments, renewable energy feasibility, and ISO 14001 Environmental Management Systems.",
      deliverables: [
        "Scope 1, 2, and 3 Carbon Footprint Assessments",
        "Greenhouse Gas (GHG) Inventory & Reporting",
        "Climate Physical & Transition Risk Assessments",
        "Sustainability & ESG Corporate Strategy Frameworks",
        "Renewable Energy (Solar & Wind) Integration Audits",
        "ISO 14001:2015 EMS Development & Audit Support"
      ],
      standards: "GHG Protocol, TCFD, ISO 14001:2015, GRI Standards",
      image: "assets/images/climate-energy.jpg"
    },
    {
      id: "geospatial",
      category: "specialized",
      title: "Geospatial, GIS & Drone Surveying",
      tagline: "High-resolution spatial analysis, GPS mapping, and topography.",
      badge: "Spatial Tech",
      summary: "Advanced satellite imagery interpretation, remote sensing, GIS mapping for mining and infrastructure, and topographical field surveys using precision GPS and Survey123/Field Maps.",
      deliverables: [
        "High-Resolution GIS & GPS Environmental Mapping",
        "Topographic, Hydrological & Land Boundary Surveys",
        "Satellite Imagery Interpretation & Land-Use Change",
        "Remote Sensing for Vegetation & Soil Degradation",
        "Infrastructure Corridor Spatial Data Collection",
        "Interactive Digital Web Maps & Spatial Dashboards"
      ],
      standards: "ESRI Enterprise, Survey Regulations of Zambia",
      image: "assets/images/gis-mapping.jpg"
    },
    {
      id: "sanitation",
      category: "specialized",
      title: "Vacuum Tanker & Mobile Sanitation",
      tagline: "Desludging, septic pumping, and event sanitation services.",
      badge: "Site Services",
      summary: "Fleet-operated vacuum tankers for emptying septic tanks, soakaway pits, sewer pond desludging, flood water clearance, and mobile toilet rentals with scheduled maintenance.",
      deliverables: [
        "Commercial & Residential Septic Tank Emptying",
        "Sewer Pond & Lagoons Desludging",
        "Grease Trap & Industrial Sludge Removal",
        "Emergency Flood Water Pumping & Evacuation",
        "Mobile Toilet Hire, Delivery, Waste Removal & Cleaning",
        "Licensed Waste Transfer to Authorized Discharge Points"
      ],
      standards: "ZEMA Wastewater Licensure, Municipal Public Health",
      image: "assets/images/industrial-effluent.jpg"
    },
    {
      id: "engineering",
      category: "water",
      title: "Architectural & Multi-Disciplinary Engineering",
      tagline: "Design, structural oversight, and geotechnical investigations.",
      badge: "Infrastructure",
      summary: "Civil, hydraulic, structural, mechanical, and safety engineering consultancy. Architectural planning, town planning, construction oversight, and geotechnical subsurface testing.",
      deliverables: [
        "Architectural Building Design, Drafting & Master Planning",
        "Civil & Hydraulic Engineering Systems Design",
        "Mining, Industrial Safety & Systems Engineering",
        "Geophysical, Geological & Subsurface Geotechnical Testing",
        "Machinery Performance, Radiographic & Failure Analysis",
        "Complete Project Management & Construction Supervision"
      ],
      standards: "EIZ (Engineering Institution of Zambia), ZIA Codes",
      image: "assets/images/engineering-supervision.jpg"
    },
    {
      id: "ppe-she",
      category: "specialized",
      title: "PPE Supply & SHE Safety Signage",
      tagline: "Certified safety gear and international standard hazard signage.",
      badge: "Safety & Compliance",
      summary: "Direct supply of certified Personal Protective Equipment (PPE) for mining, chemical, and construction environments, plus custom design, fabrication, and installation of SHE signage.",
      deliverables: [
        "Head-to-Toe Certified PPE (Respirators, Suits, Boots, Helmets)",
        "Chemical & Hazardous Substance Protective Gear",
        "Industrial Safety, Health & Environmental (SHE) Signage",
        "Emergency Evacuation Maps & Hazardous Area Placards",
        "Occupational Health & Safety Site Training Programs",
        "Routine Site Safety Compliance Inspections"
      ],
      standards: "OHS Act of Zambia, ISO 45001, OSHA Standards",
      image: "assets/images/air-monitoring.jpg"
    }
  ];

  const serviceTabs = document.querySelectorAll(".service-filter-btn");
  const servicesGrid = document.getElementById("servicesGrid");

  function renderServices(filter = "all") {
    if (!servicesGrid) return;

    const filtered = filter === "all" 
      ? servicesData 
      : servicesData.filter(s => s.category === filter);

    servicesGrid.innerHTML = filtered.map(service => `
      <div class="service-card glass-card" data-id="${service.id}">
        <div class="service-card-img-wrapper">
          <img src="${service.image}" alt="${service.title}" class="service-card-img" loading="lazy">
          <span class="service-pill">${service.badge}</span>
        </div>
        <div class="service-card-body">
          <h3 class="service-card-title">${service.title}</h3>
          <p class="service-card-text">${service.summary}</p>
          <div class="service-card-footer">
            <button class="btn-text open-service-modal" data-service="${service.id}">
              Explore Full Scope
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button class="btn-quick-inquire" data-service-title="${service.title}">
              Inquire
            </button>
          </div>
        </div>
      </div>
    `).join("");

    attachServiceModalTriggers();
  }

  serviceTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      serviceTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.getAttribute("data-filter");
      renderServices(category);
    });
  });

  // Modal Functionality
  const serviceModal = document.getElementById("serviceDetailModal");
  const modalBody = document.getElementById("serviceModalBody");
  const modalClose = document.getElementById("modalCloseBtn");

  function openServiceModal(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service || !modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-header-hero" style="background-image: linear-gradient(rgba(12, 69, 36, 0.8), rgba(12, 69, 36, 0.95)), url('${service.image}');">
        <span class="modal-badge">${service.badge}</span>
        <h2>${service.title}</h2>
        <p class="modal-tagline">${service.tagline}</p>
      </div>
      <div class="modal-content-inner">
        <div class="modal-desc-block">
          <h4>Overview</h4>
          <p>${service.summary}</p>
        </div>

        <div class="modal-deliverables-block">
          <h4>Key Scope Deliverables</h4>
          <ul class="deliverables-list">
            ${service.deliverables.map(d => `
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#26A65B" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${d}</span>
              </li>
            `).join("")}
          </ul>
        </div>

        <div class="modal-standards-block">
          <div class="standards-chip">
            <strong>Applicable Standards:</strong> ${service.standards}
          </div>
        </div>

        <div class="modal-cta-row">
          <button class="btn-primary-consult select-service-for-quote" data-title="${service.title}">
            Request Quote for This Service
          </button>
        </div>
      </div>
    `;

    serviceModal.classList.add("open");
    document.body.classList.add("no-scroll");

    // Modal Quote Button
    modalBody.querySelector(".select-service-for-quote")?.addEventListener("click", (e) => {
      const title = e.currentTarget.getAttribute("data-title");
      closeServiceModal();
      selectServiceInForm(title);
    });
  }

  function closeServiceModal() {
    serviceModal.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  modalClose?.addEventListener("click", closeServiceModal);
  serviceModal?.addEventListener("click", (e) => {
    if (e.target === serviceModal) closeServiceModal();
  });

  function attachServiceModalTriggers() {
    document.querySelectorAll(".open-service-modal").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-service");
        openServiceModal(id);
      });
    });

    document.querySelectorAll(".btn-quick-inquire").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const title = e.currentTarget.getAttribute("data-service-title");
        selectServiceInForm(title);
      });
    });
  }

  function selectServiceInForm(title) {
    const serviceSelect = document.getElementById("contactServiceSelect");
    const contactSection = document.getElementById("contact");
    if (serviceSelect) {
      // Find matching or set custom
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.includes(title) || title.includes(serviceSelect.options[i].text)) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }
    if (contactSection) {
      const headerOffset = 90;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }

  // Initial render
  renderServices("all");

  /* ==========================================================
     5. GNS-INSPIRED INTERACTIVE 5-STEP CONSULTING WORKFLOW
  ========================================================== */
  const workflowData = [
    {
      step: 1,
      name: "Preliminary Scoping & Regulatory Screening",
      phase: "Phase 1: Project Alignment",
      description: "Our senior environmental consultants conduct comprehensive initial stakeholder sessions, site reconnaissance, and regulatory mapping. We liaise directly with ZEMA, WARMA, and local authorities to establish the precise terms of reference (ToR) and project boundaries.",
      deliverables: [
        "ZEMA Project Brief (EPB) / Scoping Report",
        "Stakeholder Engagement Strategy & Matrix",
        "Comprehensive Terms of Reference (ToR) Sign-off",
        "Baseline Data Gap Analysis"
      ],
      badge: "Discovery & Permitting Setup"
    },
    {
      step: 2,
      name: "Scientific Baseline Sampling & Field Surveys",
      phase: "Phase 2: In-Situ Fieldwork",
      description: "Ewana technical teams mobilize on-site utilizing advanced instrumentation for ambient air monitoring, soil drilling, groundwater sampling, stack testing, and ecological profiling. All samples adhere strictly to chain-of-custody protocols for laboratory validation.",
      deliverables: [
        "In-situ Air, Water, and Soil Lab Analysis",
        "Noise and Structural Vibration Baseline Records",
        "Biodiversity and Ecological Habitat Assessment",
        "High-Precision GPS & Topographical Mapping"
      ],
      badge: "Data-Driven Science"
    },
    {
      step: 3,
      name: "Impact Analysis, Modeling & Mitigation Engineering",
      phase: "Phase 3: Technical Synthesis",
      description: "Combining hydrogeological modeling (MODFLOW), contaminant fate forecasting, and engineering designs, our multidisciplinary specialists craft actionable Environmental Management Plans (EMP) that mitigate hazards and protect community assets.",
      deliverables: [
        "Comprehensive Environmental & Social Impact Statement (ESIS)",
        "Quantitative Hydrogeological & Contaminant Transport Models",
        "Detailed Environmental Management & Monitoring Plan (EMP)",
        "Resettlement & Livelihood Restoration Framework (where applicable)"
      ],
      badge: "Engineering Excellence"
    },
    {
      step: 4,
      name: "Regulatory Approval & Statutory Permitting",
      phase: "Phase 4: Liaison & Verification",
      description: "We steer our clients through the formal public disclosure hearings, technical review committee inquiries, and environmental protection fund (EPF) audits until complete environmental decision letters and statutory operation licenses are secured.",
      deliverables: [
        "ZEMA Environmental Decision Letter (Approval)",
        "Public Hearing Organization & Regulatory Defense",
        "Environmental Protection Fund (EPF) Audit Compliance",
        "Hazardous Waste & Effluent Discharge Authorizations"
      ],
      badge: "100% Approval Record"
    },
    {
      step: 5,
      name: "Long-Term Compliance, Auditing & ESG Support",
      phase: "Phase 5: Operational Stewardship",
      description: "Consultancy does not end at permitting. We partner with project operators for quarterly statutory reporting, ISO 14001 EMS compliance, continuous air/water monitoring, and third-party sustainability audits throughout project lifecycles.",
      deliverables: [
        "Quarterly & Annual ZEMA Regulatory Returns",
        "Third-Party Environmental & Safety Audits",
        "ISO 14001:2015 & OHS Compliance Maintenance",
        "Continuous Facility Emissions & Groundwater Surveillance"
      ],
      badge: "Sustainable Impact"
    }
  ];

  const workflowSteps = document.querySelectorAll(".workflow-step-btn");
  const workflowDisplay = document.getElementById("workflowDisplay");

  function updateWorkflow(stepNumber) {
    const data = workflowData.find(w => w.step === stepNumber);
    if (!data || !workflowDisplay) return;

    workflowSteps.forEach(btn => {
      const btnStep = parseInt(btn.getAttribute("data-step"));
      btn.classList.toggle("active", btnStep === stepNumber);
      btn.classList.toggle("completed", btnStep < stepNumber);
    });

    workflowDisplay.innerHTML = `
      <div class="workflow-card glass-card">
        <div class="workflow-card-header">
          <div class="workflow-step-badge">Step ${data.step} of 5</div>
          <div class="workflow-phase-tag">${data.phase}</div>
        </div>
        <h3 class="workflow-card-title">${data.name}</h3>
        <p class="workflow-card-desc">${data.description}</p>
        
        <div class="workflow-deliverables">
          <h4>Core Milestones & Outputs:</h4>
          <div class="workflow-grid-chips">
            ${data.deliverables.map(d => `
              <div class="workflow-chip">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0C4524" stroke-width="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>${d}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="workflow-action-row">
          <button class="btn-step-nav prev-step" ${data.step === 1 ? "disabled" : ""} data-step="${data.step - 1}">
            &larr; Previous Stage
          </button>
          <span class="workflow-status-label">${data.badge}</span>
          <button class="btn-step-nav next-step" ${data.step === 5 ? "disabled" : ""} data-step="${data.step + 1}">
            Next Stage &rarr;
          </button>
        </div>
      </div>
    `;

    // Attach Prev / Next
    workflowDisplay.querySelector(".prev-step")?.addEventListener("click", (e) => {
      const s = parseInt(e.currentTarget.getAttribute("data-step"));
      if (s >= 1) updateWorkflow(s);
    });
    workflowDisplay.querySelector(".next-step")?.addEventListener("click", (e) => {
      const s = parseInt(e.currentTarget.getAttribute("data-step"));
      if (s <= 5) updateWorkflow(s);
    });
  }

  workflowSteps.forEach(btn => {
    btn.addEventListener("click", () => {
      const s = parseInt(btn.getAttribute("data-step"));
      updateWorkflow(s);
    });
  });

  // Initial workflow step
  updateWorkflow(1);

  /* ==========================================================
     6. INTERACTIVE PROJECT SCOPE & CONSULTATION ESTIMATOR
  ========================================================== */
  const estimatorIndustry = document.getElementById("estIndustry");
  const estimatorService = document.getElementById("estService");
  const estimatorRegion = document.getElementById("estRegion");
  const estimatorOutput = document.getElementById("estimatorOutput");
  const estimatorApplyBtn = document.getElementById("estimatorApplyBtn");

  const estimationLogic = {
    timelineMap: {
      "esia": "6 – 10 Weeks (Including Public Disclosure)",
      "monitoring": "1 – 2 Weeks (Sampling + Certified Lab Turnaround)",
      "hazardous": "2 – 4 Weeks (Remediation & Containment Execution)",
      "water": "3 – 5 Weeks (Aquifer Modeling & Engineering Advisory)",
      "gis": "1 – 2 Weeks (Drone/GPS Surveys & Spatial Mapping)",
      "audit": "2 – 3 Weeks (EPF / ISO 14001 Compliance Audit)"
    },
    regulatoryMap: {
      "mining": "ZEMA Category 1 + Mines Safety Department + EIZ Oversight",
      "energy": "ZEMA ESIA + ERB Standards + WARMA Water Extraction",
      "manufacturing": "ZEMA Air/Effluent Licensure + Local Council Public Health",
      "agriculture": "WARMA Water Rights + ZEMA Environmental Project Brief",
      "infrastructure": "ZEMA Approval + Road Development Agency / National Housing",
      "other": "ZEMA Statutory Compliance & Environmental Management Plan"
    }
  };

  function updateEstimator() {
    if (!estimatorIndustry || !estimatorService || !estimatorOutput) return;

    const indVal = estimatorIndustry.value || "mining";
    const srvVal = estimatorService.value || "esia";
    const regVal = estimatorRegion ? estimatorRegion.value : "Lusaka";

    const srvText = estimatorService.options[estimatorService.selectedIndex]?.text || "ESIA";
    const indText = estimatorIndustry.options[estimatorIndustry.selectedIndex]?.text || "Mining & Extractive";

    const estTimeline = estimationLogic.timelineMap[srvVal] || "3 – 6 Weeks";
    const estReg = estimationLogic.regulatoryMap[indVal] || "ZEMA Statutory Requirements";

    estimatorOutput.innerHTML = `
      <div class="estimator-result-card">
        <div class="result-row">
          <span class="result-label">Selected Scope:</span>
          <span class="result-value">${srvText}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Target Industry:</span>
          <span class="result-value">${indText}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Project Region:</span>
          <span class="result-value">${regVal}</span>
        </div>
        <div class="result-row highlight">
          <span class="result-label">Estimated Delivery Timeline:</span>
          <span class="result-value green">${estTimeline}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Applicable Regulators:</span>
          <span class="result-value">${estReg}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Assigned Branch:</span>
          <span class="result-value">${regVal.includes("Copperbelt") || regVal.includes("North-Western") ? "Kitwe Office (Riverside)" : "Lusaka HQ (Chalala)"}</span>
        </div>
      </div>
    `;
  }

  estimatorIndustry?.addEventListener("change", updateEstimator);
  estimatorService?.addEventListener("change", updateEstimator);
  estimatorRegion?.addEventListener("change", updateEstimator);

  estimatorApplyBtn?.addEventListener("click", () => {
    const srvText = estimatorService?.options[estimatorService.selectedIndex]?.text || "";
    const indText = estimatorIndustry?.options[estimatorIndustry.selectedIndex]?.text || "";
    const regVal = estimatorRegion?.value || "";

    const messageField = document.getElementById("contactMessage");
    const serviceSelect = document.getElementById("contactServiceSelect");

    if (messageField) {
      messageField.value = `Hello Ewana Team,\n\nI would like to request a formal quotation and technical consultation for:\n- Service: ${srvText}\n- Sector: ${indText}\n- Project Location: ${regVal}\n\nPlease advise on project scheduling, required data, and preliminary meeting availability.`;
    }

    if (serviceSelect && srvText) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.includes(srvText) || srvText.includes(serviceSelect.options[i].text)) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }

    const contactSec = document.getElementById("contact");
    if (contactSec) {
      const headerOffset = 90;
      const elementPosition = contactSec.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      messageField?.focus();
    }
  });

  // Initial calculation
  updateEstimator();

  /* ==========================================================
     7. FIELDWORK & GALLERY LIGHTBOX
  ========================================================== */
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightboxModal = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const caption = item.getAttribute("data-caption") || img.getAttribute("alt");
      if (lightboxImg && img) {
        lightboxImg.src = img.src;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightboxModal.classList.add("open");
        document.body.classList.add("no-scroll");
      }
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  lightboxClose?.addEventListener("click", closeLightbox);
  lightboxModal?.addEventListener("click", (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  /* ==========================================================
     8. CONTACT FORM SUBMISSION
  ========================================================== */
  const contactForm = document.getElementById("inquiryForm");
  const formSuccess = document.getElementById("formSuccessMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById("contactName")?.value.trim();
      const email = document.getElementById("contactEmail")?.value.trim();
      const phone = document.getElementById("contactPhone")?.value.trim();

      if (!name || !email || !phone) {
        alert("Please complete all required fields (Name, Email, Phone).");
        return;
      }

      // Simulate submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Processing Request...</span>`;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (formSuccess) {
          formSuccess.classList.remove("hidden");
          setTimeout(() => {
            formSuccess.classList.add("hidden");
          }, 8000);
        }
      }, 1200);
    });
  }

  /* ==========================================================
     9. LAZY LOAD PARALLAX OBSERVER
  ========================================================== */
  const lazySections = document.querySelectorAll(".parallax");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const bg = section.getAttribute("data-bg");
          if (bg) {
            section.style.backgroundImage = `linear-gradient(rgba(12, 69, 36, 0.65), rgba(7, 43, 22, 0.75)), ${bg}`;
            section.removeAttribute("data-bg");
          }
          obs.unobserve(section);
        }
      });
    },
    { rootMargin: "0px 0px 300px 0px", threshold: 0.1 }
  );

  lazySections.forEach((section) => observer.observe(section));

  /* ==========================================================
     10. BACK TO TOP BUTTON
  ========================================================== */
  const backToTopBtn = document.getElementById("backToTopBtn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add("visible");
    } else {
      backToTopBtn?.classList.remove("visible");
    }
  });

  backToTopBtn?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
