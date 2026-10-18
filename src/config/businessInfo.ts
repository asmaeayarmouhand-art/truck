export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  icon: string;
  badge?: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  detail: string;
}

export interface HowItWorksStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const businessInfo = {
  companyName: "TRUCK SERVICE SI",
  brandMark: "TRUCK SERVICE SI",
  brandSubtitle: "Heavy Truck & Fleet Repair",
  tagline: "Reliable Truck Repair. Built Around Your Business.",
  subtext:
    "Full-service heavy-duty truck repair, precision diesel diagnostics, semi-truck maintenance, and commercial fleet support engineered to minimize downtime and keep freight rolling.",

  // Contact Information
  contact: {
    phoneDisplay: "070543601",
    phoneTel: "070543601",
    emailDisplay: "contact@truckservice.si",
    emailMailto: "contact@truckservice.si",
    addressDisplay: "Nazorjeva ulica 6, 4000 Kranj, Slovénie",
    hoursDisplay: "Mon – Fri: 6:00 AM – 10:00 PM | Sat: 7:00 AM – 5:00 PM",
    emergencyHours: "24/7 Emergency Dispatch & Road Call Availability",
  },

  // 9 Core Services Required
  services: [
    {
      id: "diesel-engine-repair",
      title: "Diesel Engine Repair",
      shortDesc: "Comprehensive diagnostics, top-end rebuilds, turbochargers, fuel injectors, and complete in-frame diesel engine overhauls.",
      fullDesc:
        "Our heavy-duty mechanics service all major commercial diesel engines including Cummins, Detroit Diesel, PACCAR, Volvo, Mack, and Scania / MAN. From high-pressure common rail fuel leaks to turbocharger replacements and cylinder head gaskets, we restore maximum horsepower and fuel efficiency.",
      features: [
        "In-frame & out-of-frame overhauls",
        "Turbocharger & intercooler repair",
        "High-pressure fuel injection & pumps",
        "EGR, DPF & aftertreatment troubleshooting",
        "Cooling system radiators & water pumps",
      ],
      icon: "Wrench",
    },
    {
      id: "semi-truck-repair",
      title: "Semi-Truck Repair",
      shortDesc: "Complete bumper-to-bumper repairs for commercial tractors, day cabs, and highway sleepers.",
      fullDesc:
        "Engineered for heavy-duty commercial tractors. We handle heavy driveline issues, air suspension, steering gearboxes, fifth wheels, kingpins, and structural chassis components to keep your tractor safe, compliant, and reliable under severe hauling conditions.",
      features: [
        "Air-ride & leaf suspension systems",
        "Driveline, U-joints & carrier bearings",
        "Steering linkages & kingpin replacement",
        "Fifth-wheel rebuilds & adjustments",
        "Severe-duty cooling & HVAC repair",
      ],
      icon: "Truck",
    },
    {
      id: "truck-diagnostics",
      title: "Truck Diagnostics",
      shortDesc: "OEM-level electronic computer diagnostic scanning, check engine fault clearing, and live parameter sensor analysis.",
      fullDesc:
        "Eliminate guesswork with advanced commercial scanning software. We pinpoint intermittent ECM communication faults, ABS sensor errors, DEF/SCR emissions derate alerts, and electronic throttle anomalies before they cause costly roadside breakdowns.",
      features: [
        "OEM dealer-level ECM diagnostic scans",
        "DPF regeneration & emissions diagnostics",
        "Live sensor data streaming & logging",
        "CAN-bus electrical troubleshooting",
        "Rapid code reading & root-cause reporting",
      ],
      icon: "Cpu",
    },
    {
      id: "brake-repair",
      title: "Brake Repair",
      shortDesc: "Heavy-duty commercial air brake system inspections, shoe replacement, drum turning, air compressors, and valves.",
      fullDesc:
        "Brake reliability is mission-critical for commercial safety. We inspect, overhaul, and test air brake systems, spring brake chambers, S-cams, slack adjusters, air dryers, governors, and anti-lock braking systems (ABS).",
      features: [
        "Air brake shoe & drum replacements",
        "Heavy-duty disc brake rotor & caliper service",
        "Air compressors, dryers & governor valves",
        "Automatic slack adjusters & S-cam bushings",
        "Air leak tracing & safety compliance tests",
      ],
      icon: "ShieldAlert",
    },
    {
      id: "transmission-repair",
      title: "Transmission Repair",
      shortDesc: "Manual, automated manual (AMT), and automatic commercial transmission rebuilds, clutch adjustments, and differentials.",
      fullDesc:
        "Expert maintenance and repair for Eaton Fuller, ZF, Allison, Detroit DT12, and Volvo I-Shift gearboxes. We resolve gear slippage, hard shifting, clutch wear, power take-off (PTO) issues, and rear differential noise.",
      features: [
        "Manual & automated transmission service",
        "Heavy-duty clutch replacement & adjustment",
        "Differential & tandem axle repairs",
        "Flywheel machining & pilot bearing installation",
        "PTO (power take-off) unit diagnostics",
      ],
      icon: "Cog",
    },
    {
      id: "preventive-maintenance",
      title: "Preventive Maintenance",
      shortDesc: "Scheduled PM services, oil and filter changes, comprehensive chassis greasing, and annual compliance inspections.",
      fullDesc:
        "Prevent expensive catastrophic failures with proactive scheduled maintenance. Our PM packages include severe-duty oil sampling, fuel filter replacement, air system desiccant checks, coolant testing, tire condition checks, and full safety compliance reviews.",
      features: [
        "Annual commercial inspection preparation",
        "Oil & heavy-duty filter change intervals",
        "Complete 30+ point chassis lubrication",
        "Battery load testing & charging analysis",
        "Belt, tensioner & hose safety replacements",
      ],
      icon: "ClipboardCheck",
    },
    {
      id: "electrical-system-repair",
      title: "Electrical System Repair",
      shortDesc: "High-output alternators, heavy-duty starter motors, commercial battery banks, multiplex wiring, and ECM harness repairs.",
      fullDesc:
        "Modern heavy trucks depend on complex electronic architectures. Our technicians diagnose starting and charging failures, parasitic battery draws, corroded ground straps, multiplex cab lighting, and damaged engine wiring harnesses.",
      features: [
        "Heavy-duty starter & alternator replacements",
        "Commercial AGM battery bank testing",
        "Lighting & signal circuit repairs",
        "Wiring harness rebuilding & heat protection",
        "Electronic control module power & ground tracing",
      ],
      icon: "Zap",
    },
    {
      id: "fleet-maintenance",
      title: "Fleet Maintenance",
      shortDesc: "Turnkey fleet maintenance agreements, scheduled PM tracking, priority bay scheduling, and dedicated repair reporting.",
      fullDesc:
        "Designed specifically for fleet managers and commercial carriers operating multiple units. We offer customized maintenance schedules, consolidated monthly billing, expedited parts fulfillment, and dedicated fleet service advisors to keep your entire roster operating at peak utilization.",
      features: [
        "Customized fleet service agreements",
        "Consolidated maintenance tracking & records",
        "Priority service bay reservation",
        "Pre-scheduled preventive maintenance cycles",
        "Dedicated fleet account point-of-contact",
      ],
      icon: "Boxes",
    },
    {
      id: "trailer-repair",
      title: "Trailer Repair",
      shortDesc: "Dry van, reefer, and flatbed trailer repairs including air lines, gladhands, landing gear, roll doors, and suspension axles.",
      fullDesc:
        "Your tractor is only half the equation. We provide full mechanical and structural repairs for commercial semi-trailers, including air suspension alignment, wheel seal replacements, brake adjustments, kingpins, crossmembers, lighting, and roll-up door hardware.",
      features: [
        "Air brake systems & ABS trailer modules",
        "Landing gear & sand shoe replacement",
        "Roll-up & swing door latch and seal repair",
        "Wheel seals, bearings & hub oilers",
        "Trailer lighting & electrical connection wiring",
      ],
      icon: "Container",
    },
  ] as ServiceItem[],

  // Why Choose Us (5 points)
  whyChooseUs: [
    {
      title: "Experienced Technicians",
      description: "Trained mechanics specializing in commercial diesel powertrains and heavy vehicle systems.",
      detail: "Our technicians have hands-on experience diagnosing Cummins, Detroit, PACCAR, Volvo, and Caterpillar engines alongside modern automated transmissions.",
    },
    {
      title: "Clear Communication",
      description: "Direct status reports, transparent itemized estimates, and zero unapproved work.",
      detail: "Before any wrench turns, we clearly explain the root cause, parts required, turnaround estimate, and exact costs.",
    },
    {
      title: "Dependable Service",
      description: "Commercial-grade OEM and premium aftermarket parts installed with meticulous workmanship.",
      detail: "Every repaired unit undergoes system functional checks and safety validation before leaving our service bay.",
    },
    {
      title: "Commercial Vehicle Expertise",
      description: "Dedicated strictly to commercial heavy-duty trucks, tractors, and trailers.",
      detail: "We understand commercial weight stresses, regulations, and the exact operating realities of freight transport.",
    },
    {
      title: "Minimizing Downtime",
      description: "Fast triage, efficient parts procurement, and structured workflows focused on rapid return-to-service.",
      detail: "Every hour your truck sits in a bay costs money. We prioritize timely turnarounds without ever cutting corners on safety.",
    },
  ] as WhyChooseUsItem[],

  // How It Works (4 steps)
  howItWorks: [
    {
      stepNumber: "01",
      title: "Contact Our Team",
      description: "Call our service dispatch at 070543601 or submit your repair request online with your vehicle details and urgent needs.",
    },
    {
      stepNumber: "02",
      title: "Describe Your Truck Problem",
      description: "Provide your truck make, model, symptoms, active dash codes, and current location to our service team.",
    },
    {
      stepNumber: "03",
      title: "Receive Guidance & Estimate",
      description: "Our advisors review the problem, explain the recommended repair path, and present a clear, itemized estimate.",
    },
    {
      stepNumber: "04",
      title: "Get Back On The Road",
      description: "Our technicians complete the work, test the vehicle systems, verify performance, and get your truck rolling again.",
    },
  ] as HowItWorksStep[],

  // About Us
  aboutUs: {
    heading: "Dedicated to Heavy-Duty Reliability and Road Safety",
    summary:
      "TRUCK SERVICE SI provides dependable, high-standard maintenance and mechanical solutions for commercial vehicle operators. We serve independent owner-operators, freight transport fleets, and commercial businesses whose livelihood depends on reliable heavy equipment.",
    coreValues: [
      {
        title: "Workmanship & Safety",
        desc: "We perform repairs strictly following manufacturer specifications and commercial safety guidelines to ensure your vehicle handles the heaviest loads securely.",
      },
      {
        title: "Operational Reliability",
        desc: "We test our work thoroughly before sign-off, minimizing re-work and giving drivers total confidence across long-haul routes.",
      },
      {
        title: "Honest Customer Service",
        desc: "We treat every driver and fleet manager with straightforward respect, clear estimates, and timely updates throughout every repair step.",
      },
    ],
  },

  // FAQ Section
  faqs: [
    {
      question: "What types of trucks do you repair?",
      answer:
        "We repair and maintain heavy-duty commercial vehicles, including semi-tractors, day cabs, highway sleepers, box trucks, dump trucks, vocational heavy trucks, and commercial semi-trailers (dry vans, reefers, and flatbeds). We work on major commercial makes.",
    },
    {
      question: "Do you repair diesel engines?",
      answer:
        "Yes, diesel engine repair is one of our core specialties. Our technicians service commercial diesel engines including Cummins, Detroit Diesel, PACCAR, Caterpillar, Volvo, and others. We handle complete diagnostics, fuel injection systems, turbos, water pumps, cooling systems, cylinder head repairs, and both in-frame and out-of-frame overhauls.",
    },
    {
      question: "Do you offer fleet maintenance?",
      answer:
        "Yes, we provide structured fleet maintenance programs tailored to logistics companies and commercial operators of all sizes. Fleet programs include customized preventive maintenance (PM) intervals, inspection scheduling, comprehensive service history records, and priority bay scheduling to maximize fleet uptime.",
    },
    {
      question: "How can I request a repair?",
      answer:
        "You can request a repair immediately by calling our team directly at 070543601 or by filling out our online 'Request Service' form. Please provide your truck make and model, your current location, and a description of the symptoms or error codes.",
    },
    {
      question: "How can I get a repair estimate?",
      answer:
        "To get an estimate, contact our service team via phone at 070543601 or submit our online service form with details about your vehicle and the issue you're experiencing. For diagnostic issues, our advisors provide an upfront evaluation fee and turnaround expectation before our technicians begin physical testing.",
    },
  ] as FAQItem[],
};
