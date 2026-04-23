// ================================================
//  TechMate AI - JavaScript
//  Group Project - IT Students
//
//  TABLE OF CONTENTS:
//  1.  App Data (streams, prompts, chips)
//  2.  Quiz Questions Data
//  3.  Resources Data
//  4.  Roadmap Data
//  5.  State Variables
//  6.  Stream Selection (splash screen)
//  7.  Panel Navigation
//  8.  Chat Functions
//  9.  Quiz Functions
//  10. Resources Functions
//  11. Roadmap Functions
//  12. XP & Gamification
//  13. Notification Popup
//  14. Input Auto-resize
//  15. Start the app
// ================================================


// ================================================
//  1. APP DATA
//  Info about each stream (name, icon, colour)
// ================================================

const STREAMS = {
    network: {
        name:  'Network Management',
        label: 'Network',
        icon:  '🌐',
        class: 'stream-network'
    },
    software: {
        name:  'Software Development',
        label: 'Software',
        icon:  '💻',
        class: 'stream-software'
    },
    security: {
        name:  'Cybersecurity',
        label: 'Security',
        icon:  '🔐',
        class: 'stream-security'
    },
    cloud: {
        name:  'Cloud Computing',
        label: 'Cloud',
        icon:  '☁️',
        class: 'stream-cloud'
    }
};


// The AI system prompt for each stream
// This tells the AI how to behave for each subject
const AI_PROMPTS = {
    network: `You are TechMate AI, a friendly IT tutor for Network Management students in South Africa.
Help with: IP addressing, subnetting, OSI model, routing protocols (OSPF, RIP, BGP), VLANs, 
DNS, DHCP, network security, Cisco commands, troubleshooting and wireless networking.
Use code blocks for any commands or configs. Use bullet points for lists.
Keep responses clear and encouraging — around 150-300 words unless more detail is needed.`,

    software: `You are TechMate AI, a friendly IT tutor for Software Development students in South Africa.
Help with: Python, JavaScript, Java, OOP concepts, data structures, algorithms, 
SQL databases, REST APIs, Git, SDLC, design patterns and debugging.
Always use code blocks with the language name. Explain the WHY, not just the HOW.
Keep responses clear and encouraging — around 150-300 words unless code is included.`,

    security: `You are TechMate AI, a friendly IT tutor for Cybersecurity students in South Africa.
Help with: CIA triad, network security, attack types (phishing, SQL injection, MITM),
OWASP Top 10, cryptography, firewalls, ethical hacking concepts, POPIA compliance and incident response.
Always emphasise ethical use of security knowledge.
Keep responses clear and encouraging — around 150-300 words.`,

    cloud: `You are TechMate AI, a friendly IT tutor for Cloud Computing students in South Africa.
Help with: AWS services (EC2, S3, Lambda, VPC), Azure, cloud models (IaaS, PaaS, SaaS),
virtualisation, Docker, Kubernetes basics, CI/CD pipelines, IAM and serverless architecture.
Use real service names and explain trade-offs. Use code blocks for CLI commands.
Keep responses clear and encouraging — around 150-300 words.`
};


// Quick-question chips for each stream
const QUICK_CHIPS = {
    network:  ['Explain subnetting', 'OSI model layers', 'What is a VLAN?', 'DHCP vs static IP', 'Troubleshoot no internet'],
    software: ['Explain OOP', 'What is recursion?', 'REST vs GraphQL', 'Git commands cheat sheet', 'What is Big O?'],
    security: ['What is SQL injection?', 'Explain CIA triad', 'How does TLS work?', 'What is phishing?', 'OWASP Top 10'],
    cloud:    ['AWS vs Azure', 'What is serverless?', 'What is containerisation?', 'IAM best practices', 'What is load balancing?']
};


// ================================================
//  2. QUIZ QUESTIONS DATA
//  Each stream has topics and questions at 3 levels
// ================================================

const QUIZ_DATA = {

    network: {
        topics: ['IP & Subnetting', 'OSI Model', 'Routing Protocols', 'Network Security', 'DNS & DHCP', 'Wireless & VLAN'],
        questions: {
            easy: [
                {
                    question: 'How many layers does the OSI model have?',
                    options: ['5', '6', '7', '8'],
                    answer: 2,
                    explanation: 'The OSI model has <strong>7 layers</strong>: Physical, Data Link, Network, Transport, Session, Presentation, and Application.'
                },
                {
                    question: 'Which protocol automatically assigns IP addresses to devices?',
                    options: ['DNS', 'DHCP', 'FTP', 'HTTP'],
                    answer: 1,
                    explanation: '<strong>DHCP</strong> (Dynamic Host Configuration Protocol) automatically assigns IP addresses, subnet masks, gateways and DNS servers to clients.'
                },
                {
                    question: 'What does DNS stand for?',
                    options: ['Data Network System', 'Domain Name System', 'Dynamic Name Service', 'Direct Network Server'],
                    answer: 1,
                    explanation: '<strong>DNS</strong> = Domain Name System. It translates domain names like google.com into IP addresses that computers use to communicate.'
                },
                {
                    question: 'Which device operates at Layer 3 of the OSI model?',
                    options: ['Hub', 'Switch', 'Router', 'Repeater'],
                    answer: 2,
                    explanation: 'A <strong>Router</strong> works at Layer 3 (Network layer). It routes packets between different networks using IP addresses.'
                },
                {
                    question: 'What address class does 192.168.1.1 belong to?',
                    options: ['Class A', 'Class B', 'Class C', 'Class D'],
                    answer: 2,
                    explanation: '<strong>Class C</strong> covers the range 192.0.0.0 to 223.255.255.255. The 192.168.x.x range is also private and commonly used in home networks.'
                }
            ],
            medium: [
                {
                    question: 'What is the subnet mask for a /26 prefix?',
                    options: ['255.255.255.192', '255.255.255.128', '255.255.255.224', '255.255.255.240'],
                    answer: 0,
                    explanation: 'A <strong>/26</strong> gives us 64 total addresses (62 usable). The last octet in binary is 11000000 = 192. So the mask is <strong>255.255.255.192</strong>.'
                },
                {
                    question: 'Which routing protocol uses the Dijkstra (SPF) algorithm?',
                    options: ['RIP', 'EIGRP', 'OSPF', 'BGP'],
                    answer: 2,
                    explanation: '<strong>OSPF</strong> (Open Shortest Path First) uses Dijkstras Shortest Path First algorithm. It is a link-state protocol that builds a map of the entire network.'
                },
                {
                    question: 'How many usable hosts are in a /28 subnet?',
                    options: ['14', '16', '30', '32'],
                    answer: 0,
                    explanation: 'A /28 has 2^4 = 16 total addresses. Subtract network address and broadcast = <strong>14 usable hosts</strong>.'
                },
                {
                    question: 'At which OSI layer does a VLAN operate?',
                    options: ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'],
                    answer: 1,
                    explanation: '<strong>VLANs</strong> operate at <strong>Layer 2</strong> (Data Link). They logically segment a switched network using 802.1Q tagging on switch ports.'
                },
                {
                    question: 'What does ARP do?',
                    options: ['Maps IP addresses to MAC addresses', 'Assigns IP addresses to devices', 'Routes packets between networks', 'Translates domain names to IPs'],
                    answer: 0,
                    explanation: '<strong>ARP</strong> (Address Resolution Protocol) resolves an IP address to its corresponding MAC address on a local network so Layer 2 can deliver the frame.'
                }
            ],
            hard: [
                {
                    question: 'In Cisco BGP path selection, which attribute is evaluated first?',
                    options: ['MED', 'Weight', 'Local Preference', 'AS Path Length'],
                    answer: 1,
                    explanation: 'Cisco BGP evaluates: <strong>Weight</strong> first (highest wins, Cisco-only) → Local Preference → Locally originated → AS Path → Origin → MED → eBGP over iBGP → IGP metric.'
                },
                {
                    question: 'What is the main purpose of a Designated Router (DR) in OSPF?',
                    options: ['Encrypts OSPF traffic', 'Reduces LSA flooding on broadcast networks', 'Assigns IPs to OSPF interfaces', 'Connects different OSPF areas'],
                    answer: 1,
                    explanation: 'On broadcast/NBMA networks, the <strong>DR</strong> reduces the number of OSPF adjacencies needed. All routers form adjacency with the DR instead of each other, reducing complexity from O(n²) to O(n).'
                },
                {
                    question: 'What is the difference between split horizon and route poisoning?',
                    options: [
                        'They are the same technique',
                        'Split horizon prevents sending routes back the way they came; route poisoning marks failed routes with metric infinity',
                        'Split horizon is for OSPF; route poisoning is for RIP only',
                        'Route poisoning is more secure'
                    ],
                    answer: 1,
                    explanation: '<strong>Split horizon</strong> stops a router from advertising a route back out the same interface it was learned on. <strong>Route poisoning</strong> explicitly marks a failed route with metric 16 (infinity in RIP) to speed up convergence.'
                }
            ]
        }
    },

    software: {
        topics: ['OOP Principles', 'Data Structures', 'Algorithms', 'Databases', 'Web Dev', 'Git & SDLC'],
        questions: {
            easy: [
                {
                    question: 'What does OOP stand for?',
                    options: ['Object Oriented Programming', 'Open Operational Process', 'Ordered Object Protocol', 'Output Oriented Programming'],
                    answer: 0,
                    explanation: '<strong>OOP</strong> = Object-Oriented Programming. It organises code into objects that contain data (attributes) and behaviour (methods).'
                },
                {
                    question: 'Which is NOT one of the four pillars of OOP?',
                    options: ['Encapsulation', 'Compilation', 'Inheritance', 'Polymorphism'],
                    answer: 1,
                    explanation: 'The four OOP pillars are <strong>Encapsulation, Abstraction, Inheritance, and Polymorphism</strong>. Compilation is a build process, not an OOP concept.'
                },
                {
                    question: 'What does SQL stand for?',
                    options: ['Simple Query Language', 'Structured Query Language', 'Sequential Query Logic', 'Standard Queue Language'],
                    answer: 1,
                    explanation: '<strong>SQL</strong> = Structured Query Language. It is used to create, read, update and delete data in relational databases like MySQL or PostgreSQL.'
                },
                {
                    question: 'What is a function that calls itself called?',
                    options: ['A loop', 'A recursive function', 'An iterator', 'A callback'],
                    answer: 1,
                    explanation: 'A <strong>recursive function</strong> calls itself with a modified argument until it hits a base case. A classic example is calculating factorials: factorial(n) = n × factorial(n-1).'
                },
                {
                    question: 'In Git, which command saves your changes to the local repo?',
                    options: ['git push', 'git save', 'git commit', 'git store'],
                    answer: 2,
                    explanation: '<code>git commit</code> saves a snapshot of staged changes to your <strong>local</strong> repository. <code>git push</code> then sends those commits to the remote (GitHub, etc).'
                }
            ],
            medium: [
                {
                    question: 'What is the time complexity of binary search?',
                    options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
                    answer: 2,
                    explanation: '<strong>Binary search</strong> is O(log n) because each step halves the remaining search space. It requires the array to be sorted first.'
                },
                {
                    question: 'Which HTTP method is both safe AND idempotent?',
                    options: ['POST', 'PUT', 'DELETE', 'GET'],
                    answer: 3,
                    explanation: '<strong>GET</strong> is safe (does not modify data) and idempotent (calling it 10 times gives the same result as calling it once). POST is neither; PUT is idempotent but not safe.'
                },
                {
                    question: 'What is the difference between == and === in JavaScript?',
                    options: [
                        'No difference',
                        '== checks value only; === checks value AND type',
                        '=== checks value only; == checks value AND type',
                        '=== is only for objects'
                    ],
                    answer: 1,
                    explanation: '<strong>==</strong> does type coercion (0 == "0" is true). <strong>===</strong> is strict equality — checks value AND type (0 === "0" is false). Always use === to avoid bugs.'
                },
                {
                    question: 'What does a foreign key do in a relational database?',
                    options: [
                        'Uniquely identifies each row',
                        'Links two tables by referencing a primary key in another table',
                        'Encrypts sensitive columns',
                        'Speeds up queries automatically'
                    ],
                    answer: 1,
                    explanation: 'A <strong>foreign key</strong> creates a link between two tables — it references the primary key of another table, enforcing referential integrity.'
                },
                {
                    question: 'What is the space complexity of merge sort?',
                    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
                    answer: 2,
                    explanation: '<strong>Merge sort</strong> has O(n log n) time complexity but <strong>O(n) space complexity</strong> because it creates auxiliary arrays during the merge step.'
                }
            ],
            hard: [
                {
                    question: 'What does the Dependency Inversion Principle (D in SOLID) state?',
                    options: [
                        'Hide all internal data',
                        'High-level modules should not depend on low-level modules — both should depend on abstractions',
                        'Never repeat yourself',
                        'Use dynamic types always'
                    ],
                    answer: 1,
                    explanation: '<strong>Dependency Inversion</strong>: High-level modules should not depend on low-level modules. Both should depend on interfaces/abstractions. This makes your code loosely coupled and easier to test.'
                },
                {
                    question: 'What does the CAP theorem state about distributed systems?',
                    options: [
                        'All systems need Caching, Availability, and Performance',
                        'A system can only guarantee 2 of: Consistency, Availability, Partition tolerance',
                        'CAP stands for Cloud, API, Protocol',
                        'Distributed systems can achieve all three simultaneously'
                    ],
                    answer: 1,
                    explanation: '<strong>CAP Theorem</strong>: A distributed system can guarantee at most <strong>2 of 3</strong> properties — Consistency (same data everywhere), Availability (always responds), Partition Tolerance (works despite network splits).'
                },
                {
                    question: 'What is the difference between a stack and a queue?',
                    options: [
                        'No difference',
                        'Stack is LIFO (Last In First Out); Queue is FIFO (First In First Out)',
                        'Queue is LIFO; Stack is FIFO',
                        'Stack stores objects; Queue stores primitives'
                    ],
                    answer: 1,
                    explanation: 'A <strong>Stack</strong> is LIFO — the last item added is the first removed (like a stack of plates). A <strong>Queue</strong> is FIFO — the first item added is the first removed (like a queue at a shop).'
                }
            ]
        }
    },

    security: {
        topics: ['CIA Triad', 'Attack Types', 'Cryptography', 'Network Security', 'Ethical Hacking', 'Compliance'],
        questions: {
            easy: [
                {
                    question: 'What does the CIA triad stand for in cybersecurity?',
                    options: ['Cyber Intelligence Agency', 'Confidentiality, Integrity, Availability', 'Central Information Architecture', 'Compliance, Integration, Authorisation'],
                    answer: 1,
                    explanation: 'The <strong>CIA Triad</strong> is the foundation of cybersecurity: <strong>Confidentiality</strong> (only authorised access), <strong>Integrity</strong> (data is accurate and unaltered), <strong>Availability</strong> (systems are accessible when needed).'
                },
                {
                    question: 'What type of attack tricks users into revealing sensitive information?',
                    options: ['Brute Force', 'DDoS', 'Phishing', 'SQL Injection'],
                    answer: 2,
                    explanation: '<strong>Phishing</strong> is a social engineering attack where attackers impersonate trusted sources via email or SMS to steal credentials, passwords or financial info.'
                },
                {
                    question: 'What does HTTPS use to secure communications?',
                    options: ['FTP', 'SSL/TLS', 'VPN', 'SSH'],
                    answer: 1,
                    explanation: '<strong>HTTPS</strong> uses <strong>TLS</strong> (Transport Layer Security) to encrypt data between a browser and server, preventing eavesdropping and man-in-the-middle attacks.'
                },
                {
                    question: 'What is a firewall?',
                    options: [
                        'Software that speeds up the network',
                        'A system that monitors and controls network traffic based on security rules',
                        'A tool for backing up data',
                        'A type of antivirus program'
                    ],
                    answer: 1,
                    explanation: 'A <strong>firewall</strong> monitors and filters network traffic based on predefined rules. It sits between trusted (internal) and untrusted (external) networks to block unwanted traffic.'
                },
                {
                    question: 'Which is the best example of multi-factor authentication (MFA)?',
                    options: ['Using a very long password', 'Password + SMS verification code', 'Two different passwords', 'Using biometrics only'],
                    answer: 1,
                    explanation: '<strong>MFA</strong> requires 2+ factors from different categories: something you <em>know</em> (password), something you <em>have</em> (phone/OTP), or something you <em>are</em> (fingerprint).'
                }
            ],
            medium: [
                {
                    question: 'What is a Man-in-the-Middle (MITM) attack?',
                    options: [
                        'Attacking a server directly with brute force',
                        'An attacker secretly intercepts and possibly alters communication between two parties',
                        'Installing malware on a remote device',
                        'Guessing passwords using a wordlist'
                    ],
                    answer: 1,
                    explanation: 'In a <strong>MITM attack</strong>, the attacker secretly positions themselves between two communicating parties, reading or altering messages without either party realising.'
                },
                {
                    question: 'What does SQL Injection exploit?',
                    options: ['Weak passwords', 'Unvalidated user input passed into database queries', 'Unsecured Wi-Fi', 'Malicious email links'],
                    answer: 1,
                    explanation: '<strong>SQL Injection</strong> happens when user input is passed directly into SQL queries without sanitisation — allowing an attacker to manipulate, dump or destroy database data.'
                },
                {
                    question: 'What is the difference between symmetric and asymmetric encryption?',
                    options: [
                        'No real difference',
                        'Symmetric uses one shared key; asymmetric uses a public/private key pair',
                        'Asymmetric is always faster',
                        'Symmetric uses public keys only'
                    ],
                    answer: 1,
                    explanation: '<strong>Symmetric</strong>: one key encrypts and decrypts (AES) — fast but key sharing is a challenge. <strong>Asymmetric</strong>: public key encrypts, private key decrypts (RSA) — solves key distribution but is slower.'
                },
                {
                    question: 'What is a zero-day vulnerability?',
                    options: [
                        'A bug that was fixed on the day it was found',
                        'A flaw unknown to the vendor with no available patch yet',
                        'A vulnerability discovered exactly 24 hours ago',
                        'A type of DoS attack'
                    ],
                    answer: 1,
                    explanation: 'A <strong>zero-day</strong> is a vulnerability unknown to the software vendor — they have zero days to prepare a fix. Attackers exploit these before patches exist, making them extremely dangerous.'
                },
                {
                    question: 'What does IDS stand for and what does it do?',
                    options: [
                        'Internet Defence System — blocks all hackers',
                        'Intrusion Detection System — monitors traffic and alerts on suspicious activity',
                        'Internal Data Security — encrypts internal files',
                        'Intrusion Defence System — blocks attacks in real time'
                    ],
                    answer: 1,
                    explanation: 'An <strong>IDS</strong> (Intrusion Detection System) monitors network traffic and raises alerts when suspicious patterns are detected. It is passive — it detects but does not block. An IPS (Prevention) actively blocks threats.'
                }
            ],
            hard: [
                {
                    question: 'What is the purpose of a DMZ in a network security architecture?',
                    options: [
                        'Encrypts all internal traffic',
                        'Hosts public-facing services isolated from the internal network',
                        'Stores encrypted backup data',
                        'Runs vulnerability scans on the network'
                    ],
                    answer: 1,
                    explanation: 'A <strong>DMZ</strong> (Demilitarised Zone) is a network segment that hosts public services (web servers, email) isolated from the internal LAN. A breach in the DMZ does not give direct access to internal systems.'
                },
                {
                    question: 'In penetration testing, what does privilege escalation mean?',
                    options: [
                        'Getting admin credentials via phishing',
                        'Gaining higher access rights than initially obtained after compromising a system',
                        'Scanning for open ports on a target',
                        'Cracking Wi-Fi passwords'
                    ],
                    answer: 1,
                    explanation: '<strong>Privilege escalation</strong> happens after initial access — an attacker exploits vulnerabilities to gain higher privileges (e.g., from a standard user to root/Administrator), allowing deeper system control.'
                },
                {
                    question: 'What is the difference between black box, white box and grey box testing?',
                    options: [
                        'They are the same — just different names',
                        'Black box = no info given; White box = full system knowledge; Grey box = partial knowledge',
                        'White box = no info given; Black box = full knowledge',
                        'Grey box testing is illegal'
                    ],
                    answer: 1,
                    explanation: '<strong>Black box</strong>: tester has no prior knowledge (simulates an external attacker). <strong>White box</strong>: full access to source code and architecture. <strong>Grey box</strong>: partial knowledge — simulates an insider threat or partner.'
                }
            ]
        }
    },

    cloud: {
        topics: ['Cloud Models', 'AWS Core Services', 'Virtualisation', 'Security', 'DevOps & CI/CD', 'Cost & Scaling'],
        questions: {
            easy: [
                {
                    question: 'What does IaaS stand for?',
                    options: ['Internet as a Service', 'Infrastructure as a Service', 'Integration as a Service', 'Information as a Service'],
                    answer: 1,
                    explanation: '<strong>IaaS</strong> = Infrastructure as a Service. Providers offer virtualised compute, storage and networking. Examples: AWS EC2, Azure VMs, Google Compute Engine.'
                },
                {
                    question: 'Which AWS service stores objects like images, videos and backups?',
                    options: ['EC2', 'RDS', 'S3', 'Lambda'],
                    answer: 2,
                    explanation: '<strong>Amazon S3</strong> (Simple Storage Service) is object storage for any type of file. It offers 99.999999999% (11 nines) durability and is used for backups, static websites and media storage.'
                },
                {
                    question: 'What is the main benefit of auto-scaling?',
                    options: ['Reduces cost always', 'Automatically adjusts capacity based on demand', 'Encrypts data at rest', 'Speeds up database queries'],
                    answer: 1,
                    explanation: '<strong>Auto-scaling</strong> dynamically adds instances when traffic increases and removes them when demand drops. This keeps performance stable while minimising cost.'
                },
                {
                    question: 'What does "serverless" mean in cloud computing?',
                    options: [
                        'No physical servers exist anywhere',
                        'Developers deploy code without managing the underlying server infrastructure',
                        'Servers are provided for free',
                        'Only on-premises servers are used'
                    ],
                    answer: 1,
                    explanation: '<strong>Serverless</strong> means you write and deploy code (functions) without provisioning or managing servers. The cloud provider handles all infrastructure automatically. Example: AWS Lambda.'
                },
                {
                    question: 'What is a VPC in AWS?',
                    options: [
                        'Virtual Private Cloud — an isolated network in AWS',
                        'Very Powerful Computer — a large EC2 instance',
                        'Virtual Public Connection — an internet gateway',
                        'Variable Pricing Calculator — a cost tool'
                    ],
                    answer: 0,
                    explanation: 'A <strong>VPC</strong> (Virtual Private Cloud) is a logically isolated virtual network in AWS where you control IP address ranges, subnets, routing tables and network gateways.'
                }
            ],
            medium: [
                {
                    question: 'What is the difference between vertical and horizontal scaling?',
                    options: [
                        'No difference at all',
                        'Vertical = adding more instances; Horizontal = upgrading one instance',
                        'Vertical = upgrading one instance (more CPU/RAM); Horizontal = adding more instances',
                        'Vertical scaling is always cheaper'
                    ],
                    answer: 2,
                    explanation: '<strong>Vertical scaling</strong> (scale up) = add more CPU/RAM to a single machine. <strong>Horizontal scaling</strong> (scale out) = add more machines. Horizontal is preferred in cloud for resilience and cost.'
                },
                {
                    question: 'What does Docker containerise?',
                    options: [
                        'Physical servers',
                        'An application and all its dependencies into a portable, isolated unit',
                        'Database backups only',
                        'Network configurations'
                    ],
                    answer: 1,
                    explanation: '<strong>Docker</strong> packages an application together with its entire runtime environment (code, libraries, config) into a <strong>container</strong> that runs identically on any machine.'
                },
                {
                    question: 'What is the purpose of a load balancer?',
                    options: [
                        'To store backup data',
                        'To distribute incoming traffic across multiple servers',
                        'To encrypt cloud traffic',
                        'To monitor server CPU usage'
                    ],
                    answer: 1,
                    explanation: 'A <strong>load balancer</strong> distributes incoming requests across multiple backend servers — preventing overload, improving availability, and enabling zero-downtime deployments using health checks.'
                },
                {
                    question: 'In AWS IAM, what is the principle of least privilege?',
                    options: [
                        'Give all users admin access for convenience',
                        'Grant only the minimum permissions a user or service needs to do their job',
                        'Use a single IAM user for all services',
                        'Rotate passwords every day'
                    ],
                    answer: 1,
                    explanation: '<strong>Least privilege</strong> means giving users and services ONLY the permissions they need — nothing more. This limits the damage if an account is compromised or misconfigured.'
                },
                {
                    question: 'What is a CDN used for?',
                    options: [
                        'Central Database Node — a master cloud server',
                        'Content Delivery Network — caches content at edge locations closer to users to reduce latency',
                        'Cloud Deployment Network — for CI/CD pipelines',
                        'Continuous Development Node — a build server'
                    ],
                    answer: 1,
                    explanation: 'A <strong>CDN</strong> (Content Delivery Network) caches content (images, scripts, videos) at global edge locations. Users are served from the nearest node, dramatically reducing load times.'
                }
            ],
            hard: [
                {
                    question: 'What is the difference between RTO and RPO?',
                    options: [
                        'They are the same metric',
                        'RTO = maximum acceptable recovery time; RPO = maximum acceptable data loss',
                        'RPO = maximum recovery time; RTO = acceptable data loss',
                        'Both only measure recovery time'
                    ],
                    answer: 1,
                    explanation: '<strong>RTO</strong> (Recovery Time Objective) = how long you can afford to be down. <strong>RPO</strong> (Recovery Point Objective) = how much data loss is acceptable (time since last backup). Both drive disaster recovery design.'
                },
                {
                    question: 'What is Kubernetes primarily used for?',
                    options: [
                        'Running SQL databases',
                        'Container orchestration — automating the deployment, scaling and management of containers',
                        'Network monitoring and alerting',
                        'DNS management in the cloud'
                    ],
                    answer: 1,
                    explanation: '<strong>Kubernetes (K8s)</strong> is a container orchestration platform. It automates deploying, scaling, load balancing and managing containers at scale, solving the challenge of running many containers in production.'
                },
                {
                    question: 'What is the main challenge of a multi-region active-active architecture?',
                    options: [
                        'Higher monthly costs',
                        'Data consistency and replication latency between regions',
                        'Too many servers to manage',
                        'Lack of support from cloud providers'
                    ],
                    answer: 1,
                    explanation: 'In <strong>active-active multi-region</strong>, both regions serve live traffic simultaneously. The key challenge is <strong>data consistency</strong> — changes in one region must replicate to others quickly, often requiring eventual consistency trade-offs (CAP theorem).'
                }
            ]
        }
    }
};


// ================================================
//  3. RESOURCES DATA
//  Study links and tools for each stream
// ================================================

const RESOURCES_DATA = {
    network: [
        { tag: 'Free Course', title: 'Cisco NetAcad', desc: 'Official Cisco courses covering CCNA concepts, Packet Tracer labs and certification paths.' },
        { tag: 'Practice', title: 'Packet Tracer Labs', desc: 'Simulate real networks — configure routers, switches and test protocols in a safe environment.' },
        { tag: 'YouTube', title: 'Professor Messer', desc: 'Free CompTIA Network+ video series — clear and thorough explanations of all networking topics.' },
        { tag: 'Reference', title: 'Subnet Calculator', desc: 'Use subnet.xyz or similar tools to verify your subnetting calculations quickly.' },
        { tag: 'Book', title: 'Computer Networking: A Top-Down Approach', desc: 'Kurose & Ross — the gold-standard university networking textbook. Available at most libraries.' },
        { tag: 'Certification', title: 'CompTIA Network+', desc: 'Vendor-neutral networking certification — a great entry-level qualification for network engineers.' }
    ],
    software: [
        { tag: 'Interactive', title: 'freeCodeCamp', desc: 'Free full-stack curriculum — HTML, CSS, JavaScript, Python and databases with certifications.' },
        { tag: 'Practice', title: 'LeetCode / HackerRank', desc: 'Algorithm and data structure challenges ranked by difficulty — essential for skill building and interviews.' },
        { tag: 'Reference', title: 'MDN Web Docs', desc: 'The go-to reference for HTML, CSS and JavaScript. Bookmark this and use it daily.' },
        { tag: 'Free Course', title: 'CS50 by Harvard', desc: 'Harvard\'s free intro CS course on edX — covers C, Python, SQL and web development.' },
        { tag: 'Tool', title: 'GitHub', desc: 'Create a GitHub profile and push every project you build. It becomes your portfolio for employers.' },
        { tag: 'Practice', title: 'The Odin Project', desc: 'Free full-stack web development curriculum with real projects and an active student community.' }
    ],
    security: [
        { tag: 'Platform', title: 'TryHackMe', desc: 'Guided, beginner-friendly cybersecurity learning paths. Perfect for starting ethical hacking.' },
        { tag: 'Practice', title: 'HackTheBox', desc: 'Real penetration testing machines and challenges — solve them to build practical offensive skills.' },
        { tag: 'Reference', title: 'OWASP Top 10', desc: 'The industry standard list of web application security risks. Essential reading for any security student.' },
        { tag: 'Free Course', title: 'Cybrary', desc: 'Free cybersecurity courses for CompTIA Security+, CEH, and CISSP with video and hands-on labs.' },
        { tag: 'Tool', title: 'Kali Linux', desc: 'The standard penetration testing OS — pre-installed with tools like Nmap, Metasploit, and Wireshark.' },
        { tag: 'Certification', title: 'CompTIA Security+', desc: 'The entry-level, industry-recognised cybersecurity certification. A great first goal for security students.' }
    ],
    cloud: [
        { tag: 'Official', title: 'AWS Skill Builder', desc: 'Free and paid AWS training directly from Amazon — includes hands-on labs and practice exams.' },
        { tag: 'Free Account', title: 'AWS Free Tier', desc: 'Sign up for a free AWS account and get 12 months of free tier access to build real cloud projects.' },
        { tag: 'Course', title: 'A Cloud Guru / Pluralsight', desc: 'Video courses for AWS, Azure and GCP with live cloud labs in real environments.' },
        { tag: 'Certification', title: 'AWS Cloud Practitioner', desc: 'Entry-level AWS certification validating foundational cloud knowledge. The best starting point.' },
        { tag: 'Reference', title: 'AWS Architecture Center', desc: 'Official AWS reference architectures, best practices and whitepapers for cloud design.' },
        { tag: 'Tool', title: 'Docker Desktop', desc: 'Run containers on your local machine. Essential for understanding containerisation and DevOps.' }
    ]
};


// ================================================
//  4. ROADMAP DATA
//  Project phases for the group
// ================================================

const ROADMAP_DATA = [
    {
        phase: 1,
        title: 'Foundation & Planning',
        duration: 'Week 1–2',
        tasks: [
            'Define project scope: AI study chatbot covering 4 IT streams',
            'Divide roles — Lehlogonolo (Network + AI prompts), Software Dev members (UI + API logic), all members own their stream\'s quiz data',
            'Create a shared GitHub repository with main, dev and feature/* branches',
            'Agree on tech stack: HTML + CSS + JavaScript + Groq AI API (no framework needed for MVP)',
            'Draw wireframes on paper or Figma for Chat, Quiz, Resources and Roadmap panels',
            'Agree on code style: indentation, naming conventions, commit message format'
        ]
    },
    {
        phase: 2,
        title: 'Core App Architecture',
        duration: 'Week 2–3',
        tasks: [
            'Build the splash screen with stream selection (4 cards)',
            'Build the sidebar navigation and panel switching logic',
            'Implement stream context system — each stream loads its own AI prompt, quiz data and resources',
            'Integrate the Groq AI API via Flask backend: system prompt + conversation history management',
            'Render messages correctly: bold text, code blocks, bullet points',
            'Add quick-chip prompt suggestions per stream'
        ]
    },
    {
        phase: 3,
        title: 'Quiz Engine',
        duration: 'Week 3–4',
        tasks: [
            'Build the quiz data structure: 3 difficulty levels × multiple topics × 4 streams',
            'Implement the countdown timer per question (60s easy, 45s medium, 30s hard)',
            'Build answer selection, correct/wrong highlighting and explanation reveal',
            'Add score tracking, XP rewards and streak notifications',
            'Build the results screen with breakdown by difficulty and topic',
            'Add the "Get AI Study Tips" button that sends quiz results to the AI chat'
        ]
    },
    {
        phase: 4,
        title: 'Resources & Roadmap Panels',
        duration: 'Week 4–5',
        tasks: [
            'Each stream member writes and verifies their own resource cards (6 resources per stream)',
            'Build the resource card grid with tags, titles and descriptions',
            'Build the visual roadmap with the phase timeline layout',
            'Add search or filter functionality to the resources panel',
            'Make sure all external links are valid and open correctly'
        ]
    },
    {
        phase: 5,
        title: 'Testing, Polish & Presentation',
        duration: 'Week 5–6',
        tasks: [
            'Test on mobile phones and different browsers (Chrome, Firefox, Edge)',
            'User testing: give classmates from each stream the chatbot and collect feedback',
            'Fix bugs, improve loading states and add proper error messages for API failures',
            'Check colour contrast and make sure the app is keyboard-navigable',
            'Deploy to GitHub Pages or Netlify for a free, shareable live URL',
            'Write a README.md explaining the project, tech stack and each member\'s contribution',
            'Prepare a 5-minute live demo showing all 4 streams, the quiz engine and AI chat'
        ]
    }
];


// ================================================
//  5. STATE VARIABLES
//  Things that change while the app is running
// ================================================

let currentStream     = 'network'; // which stream is active
let chatHistory       = [];        // conversation history sent to the AI
let xp                = 0;         // current XP amount
let totalScore        = 0;         // total quiz score

// Quiz state
let quizQuestions     = [];        // current set of questions
let currentQuestion   = 0;        // which question we're on
let correctAnswers    = 0;        // how many correct so far
let hasAnswered       = false;     // did the user answer this question?
let selectedTopic     = null;      // chosen quiz topic
let selectedDiff      = 'easy';   // chosen difficulty
let timerInterval     = null;      // reference to the timer
let timerSeconds      = 0;        // countdown value


// ================================================
//  6. STREAM SELECTION
//  Splash screen logic
// ================================================

function selectStream(stream) {
    currentStream = stream;

    // Remove any old stream class from body and add the new one
    document.body.classList.remove('stream-network', 'stream-software', 'stream-security', 'stream-cloud');
    document.body.classList.add(STREAMS[stream].class);

    // Update sidebar badge
    document.getElementById('streamIcon').textContent = STREAMS[stream].icon;
    document.getElementById('streamName').textContent  = STREAMS[stream].label;

    // Hide splash, show app
    document.getElementById('splash').classList.add('fade-out');
    setTimeout(function() {
        document.getElementById('app').classList.remove('hidden');
        document.getElementById('app').classList.add('visible');
    }, 400);

    // Reset state
    chatHistory   = [];
    xp            = 0;
    totalScore    = 0;
    document.getElementById('totalScore').textContent = '0';
    updateXpBar();

    // Build all panels
    startChat();
    buildChips();
    buildQuizStart();
    buildResources();
    buildRoadmap();
}


function showSplash() {
    // Go back to splash screen so user can switch stream
    document.getElementById('app').classList.remove('visible');
    document.getElementById('app').classList.add('hidden');

    setTimeout(function() {
        document.getElementById('splash').classList.remove('fade-out');
    }, 300);

    chatHistory = [];
}


// ================================================
//  7. PANEL NAVIGATION
// ================================================

function showPanel(panelId, clickedBtn) {
    // Hide all panels
    var allPanels = document.querySelectorAll('.panel');
    allPanels.forEach(function(p) {
        p.classList.add('hidden');
        p.classList.remove('active');
    });

    // Show the selected panel
    document.getElementById(panelId).classList.remove('hidden');
    document.getElementById(panelId).classList.add('active');

    // Update nav button styles
    var allBtns = document.querySelectorAll('.nav-btn');
    allBtns.forEach(function(btn) {
        btn.classList.remove('active');
    });
    clickedBtn.classList.add('active');
}


// ================================================
//  8. CHAT FUNCTIONS
// ================================================

function startChat() {
    var messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = '';
    chatHistory = [];

    // Welcome messages per stream
    var welcome = {
        network:  'Hey! I\'m **TechMate AI**, your Network Management assistant 🌐\n\nI can help you with:\n- **Subnetting** and IP addressing\n- **OSI model** and protocols\n- **Routing** (OSPF, RIP, BGP)\n- **Cisco** commands and configs\n- **Troubleshooting** network problems\n\nWhat do you want to learn today?',
        software: 'Hey! I\'m **TechMate AI**, your Software Development assistant 💻\n\nI can help you with:\n- **OOP** principles and design patterns\n- **Data structures** and algorithms\n- **Code review** and debugging\n- **SQL** databases and APIs\n- **Git** and SDLC concepts\n\nWhat are you working on?',
        security: 'Hey! I\'m **TechMate AI**, your Cybersecurity assistant 🔐\n\nI can help you with:\n- **CIA Triad** and security fundamentals\n- **Attack types** and how they work\n- **Cryptography** concepts\n- **OWASP Top 10** vulnerabilities\n- **Ethical hacking** methodology\n\nWhat security topic can I break down for you?',
        cloud:    'Hey! I\'m **TechMate AI**, your Cloud Computing assistant ☁️\n\nI can help you with:\n- **AWS and Azure** services\n- **Cloud models** (IaaS, PaaS, SaaS)\n- **Docker and Kubernetes** basics\n- **IAM and security** best practices\n- **DevOps and CI/CD** pipelines\n\nWhat cloud concept can I help you master?'
    };

    addMessage('bot', welcome[currentStream]);
}


function addMessage(role, text) {
    var messageArea = document.getElementById('messageArea');

    // Create message row
    var msgDiv = document.createElement('div');
    msgDiv.className = 'message ' + role;

    // Avatar
    var avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = (role === 'bot') ? '🤖' : '👤';

    // Bubble
    var bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = formatText(text);

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    messageArea.appendChild(msgDiv);

    // Scroll to bottom
    messageArea.scrollTop = messageArea.scrollHeight;

    return msgDiv;
}


function addTypingIndicator() {
    var messageArea = document.getElementById('messageArea');

    var msgDiv = document.createElement('div');
    msgDiv.className = 'message bot';
    msgDiv.id = 'typingIndicator';

    var avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = '🤖';

    var bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    messageArea.appendChild(msgDiv);
    messageArea.scrollTop = messageArea.scrollHeight;
}


function removeTypingIndicator() {
    var indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}


// Convert simple markdown-like formatting to HTML
function formatText(text) {
    return text
        // Bold: **text**
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Inline code: `code`
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Code blocks: ```code```
        .replace(/```[\w]*\n([\s\S]*?)```/g, function(match, code) {
            var escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return '<pre><code>' + escaped + '</code></pre>';
        })
        // Headings: ## Heading
        .replace(/^## (.+)$/gm, '<h3 style="margin: 0.6rem 0 0.3rem; font-family: var(--font-title); font-size: 0.95rem;">$1</h3>')
        // Bullet points: - item
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        // Wrap consecutive li items in ul
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        // Double newline = paragraph break
        .replace(/\n\n/g, '<br><br>')
        // Single newline
        .replace(/\n/g, '<br>');
}


async function sendMessage() {
    var input   = document.getElementById('chatInput');
    var text    = input.value.trim();

    if (!text) return;

    // Clear input and reset height
    input.value = '';
    input.style.height = 'auto';

    await sendText(text);
}


// ── FIX: sendText now sends system_prompt to the Flask backend ──
async function sendText(text) {

    var sendBtn = document.getElementById('sendBtn');

    addMessage('user', text);
    chatHistory.push({ role: 'user', content: text });

    sendBtn.disabled = true;
    addTypingIndicator();

    try {

        var res = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message:       text,
                system_prompt: AI_PROMPTS[currentStream]   // ← sends the correct tutor prompt
            })
        });

        if (!res.ok) {
            throw new Error('Server returned ' + res.status);
        }

        var data = await res.json();

        removeTypingIndicator();

        if (!data.reply) {
            throw new Error('No reply from server');
        }

        addMessage('bot', data.reply);

        chatHistory.push({
            role:    'assistant',
            content: data.reply
        });

        addXp(5);

    } catch (error) {

        removeTypingIndicator();
        console.error('Chat error:', error);

        addMessage(
            'bot',
            '⚠️ Could not reach the backend. Make sure Flask is running on port 5000. (' + error.message + ')'
        );
    }

    sendBtn.disabled = false;
    document.getElementById('chatInput').focus();
}


function buildChips() {
    var chipsArea = document.getElementById('chipsArea');
    chipsArea.innerHTML = '';

    var chips = QUICK_CHIPS[currentStream];

    chips.forEach(function(chipText) {
        var btn = document.createElement('button');
        btn.className = 'chip';
        btn.textContent = chipText;
        btn.onclick = function() {
            sendText(chipText);
        };
        chipsArea.appendChild(btn);
    });
}


function clearChat() {
    startChat();
    buildChips();
}


// ================================================
//  9. QUIZ FUNCTIONS
// ================================================

function buildQuizStart() {
    var quizContent = document.getElementById('quizContent');
    var streamData  = QUIZ_DATA[currentStream];

    // Build the topic buttons
    var topicsHTML = '';
    streamData.topics.forEach(function(topic) {
        topicsHTML += '<button class="topic-btn" onclick="pickTopic(this, \'' + topic + '\')">' + topic + '</button>';
    });
    topicsHTML += '<button class="topic-btn" onclick="pickTopic(this, \'mixed\')">🎲 Mixed</button>';

    quizContent.innerHTML = `
        <div class="quiz-start">
            <h3>🧠 Quiz: ${streamData.topics[0].split(' ')[0]} & More</h3>
            <p>Test your knowledge with timed questions. Pick a topic and a difficulty level, then answer 5 questions. You earn XP for every correct answer!</p>

            <div class="topic-grid">${topicsHTML}</div>

            <p class="diff-label">Difficulty Level</p>
            <div class="diff-row">
                <button class="diff-btn selected" onclick="pickDifficulty(this, 'easy')">Easy</button>
                <button class="diff-btn" onclick="pickDifficulty(this, 'medium')">Medium</button>
                <button class="diff-btn" onclick="pickDifficulty(this, 'hard')">Hard</button>
                <button class="diff-btn" onclick="pickDifficulty(this, 'mixed')">Mixed</button>
            </div>

            <button class="btn-primary" id="startQuizBtn" onclick="startQuiz()" disabled>
                Start Quiz →
            </button>
        </div>
    `;

    // Reset quiz selections
    selectedTopic = null;
    selectedDiff  = 'easy';
}


function pickTopic(btn, topic) {
    document.querySelectorAll('.topic-btn').forEach(function(b) {
        b.classList.remove('selected');
    });
    btn.classList.add('selected');
    selectedTopic = topic;
    document.getElementById('startQuizBtn').disabled = false;
}


function pickDifficulty(btn, diff) {
    document.querySelectorAll('.diff-btn').forEach(function(b) {
        b.classList.remove('selected');
    });
    btn.classList.add('selected');
    selectedDiff = diff;
}


function startQuiz() {
    var streamData = QUIZ_DATA[currentStream];
    var pool = [];

    if (selectedDiff === 'mixed') {
        pool = pool.concat(streamData.questions.easy);
        pool = pool.concat(streamData.questions.medium);
        pool = pool.concat(streamData.questions.hard);
    } else {
        pool = streamData.questions[selectedDiff].slice();
    }

    // Shuffle and take 5
    pool = pool.sort(function() { return Math.random() - 0.5; });
    quizQuestions   = pool.slice(0, 5);
    currentQuestion = 0;
    correctAnswers  = 0;
    hasAnswered     = false;

    showQuestion();
}


function showQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showResults();
        return;
    }

    var q        = quizQuestions[currentQuestion];
    var timerMax = (selectedDiff === 'hard') ? 30 : (selectedDiff === 'medium') ? 45 : 60;
    timerSeconds = timerMax;
    hasAnswered  = false;

    var progress = (currentQuestion / quizQuestions.length) * 100;

    // Build options HTML
    var optionsHTML = '';
    var letters     = ['A', 'B', 'C', 'D'];
    q.options.forEach(function(opt, i) {
        optionsHTML += `
            <button class="option-btn" onclick="selectOption(${i})" id="option-${i}">
                <span class="option-letter">${letters[i]}</span>
                <span>${opt}</span>
            </button>
        `;
    });

    document.getElementById('quizContent').innerHTML = `
        <div class="quiz-active">
            <div class="quiz-meta">
                <span class="q-number">Question ${currentQuestion + 1} / ${quizQuestions.length}</span>
                <span>✅ ${correctAnswers} correct</span>
                <span class="quiz-timer" id="timerEl">${timerSeconds}s</span>
            </div>

            <div class="quiz-progress-bg">
                <div class="quiz-progress-fill" style="width: ${progress}%"></div>
            </div>

            <div class="question-text">${q.question}</div>

            <div class="options-list">
                ${optionsHTML}
            </div>

            <div class="explanation-box" id="explanationBox">
                <strong>Explanation:</strong> ${q.explanation}
            </div>

            <div class="next-btn-row" id="nextBtnRow">
                <button class="btn-primary" onclick="nextQuestion()">
                    ${(currentQuestion + 1 < quizQuestions.length) ? 'Next Question →' : 'See Results →'}
                </button>
            </div>
        </div>
    `;

    // Start the countdown timer
    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        timerSeconds--;
        var timerEl = document.getElementById('timerEl');
        if (!timerEl) {
            clearInterval(timerInterval);
            return;
        }
        timerEl.textContent = timerSeconds + 's';

        if (timerSeconds <= 10) {
            timerEl.classList.add('warning');
        }

        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            if (!hasAnswered) timeUp();
        }
    }, 1000);
}


function selectOption(index) {
    if (hasAnswered) return;

    hasAnswered = true;
    clearInterval(timerInterval);

    var q = quizQuestions[currentQuestion];

    for (var i = 0; i < q.options.length; i++) {
        var btn = document.getElementById('option-' + i);
        btn.disabled = true;

        if (i === q.answer) {
            btn.classList.add('correct');
        } else if (i === index && index !== q.answer) {
            btn.classList.add('wrong');
        }
    }

    document.getElementById('explanationBox').classList.add('show');
    document.getElementById('nextBtnRow').classList.add('show');

    if (index === q.answer) {
        correctAnswers++;
        var xpEarned = (selectedDiff === 'hard') ? 30 : (selectedDiff === 'medium') ? 20 : 10;
        addXp(xpEarned);
        showNotification('✅ Correct! +' + xpEarned + ' XP');
    } else {
        showNotification('❌ Wrong — read the explanation below');
    }
}


function timeUp() {
    if (hasAnswered) return;
    hasAnswered = true;

    var q = quizQuestions[currentQuestion];

    for (var i = 0; i < q.options.length; i++) {
        var btn = document.getElementById('option-' + i);
        btn.disabled = true;
        if (i === q.answer) btn.classList.add('correct');
    }

    document.getElementById('explanationBox').classList.add('show');
    document.getElementById('nextBtnRow').classList.add('show');
    showNotification('⏰ Time\'s up!');
}


function nextQuestion() {
    currentQuestion++;
    showQuestion();
}


function showResults() {
    clearInterval(timerInterval);

    var pct      = Math.round((correctAnswers / quizQuestions.length) * 100);
    var grade    = (pct >= 80) ? '🔥 Excellent work!' : (pct >= 60) ? '👍 Good effort!' : '📖 Keep studying!';
    var xpEarned = correctAnswers * ((selectedDiff === 'hard') ? 30 : (selectedDiff === 'medium') ? 20 : 10);

    totalScore += xpEarned;
    document.getElementById('totalScore').textContent = totalScore;

    document.getElementById('quizContent').innerHTML = `
        <div class="quiz-results">
            <div class="results-grade">${grade}</div>
            <div class="results-score">${pct}%</div>
            <div class="results-subtitle">${correctAnswers} out of ${quizQuestions.length} correct</div>

            <div class="results-breakdown">
                <div class="breakdown-row">
                    <span>Correct Answers</span>
                    <span class="value">${correctAnswers} / ${quizQuestions.length}</span>
                </div>
                <div class="breakdown-row">
                    <span>Difficulty</span>
                    <span class="value">${selectedDiff.toUpperCase()}</span>
                </div>
                <div class="breakdown-row">
                    <span>XP Earned This Quiz</span>
                    <span class="value">+${xpEarned}</span>
                </div>
                <div class="breakdown-row">
                    <span>Total Score</span>
                    <span class="value">${totalScore}</span>
                </div>
            </div>

            <div class="results-actions">
                <button class="btn-primary" onclick="startQuiz()">Try Again</button>
                <button class="btn-secondary" onclick="buildQuizStart()">Change Topic</button>
                <button class="btn-secondary" onclick="getAiStudyTips()">🤖 Get Study Tips</button>
            </div>
        </div>
    `;
}


function getAiStudyTips() {
    var pct     = Math.round((correctAnswers / quizQuestions.length) * 100);
    var topic   = selectedTopic || 'general ' + STREAMS[currentStream].name;
    var message = 'I just scored ' + pct + '% on a ' + selectedDiff + ' quiz about ' + topic + ' in ' + STREAMS[currentStream].name + '. What should I focus on to improve? Give me 3 specific study tips.';

    var chatBtn = document.querySelector('[onclick*="chatPanel"]');
    showPanel('chatPanel', chatBtn);

    sendText(message);
}


// ================================================
//  10. RESOURCES FUNCTIONS
// ================================================

function buildResources() {
    var content   = document.getElementById('resourcesContent');
    var resources = RESOURCES_DATA[currentStream];

    var cardsHTML = '';
    resources.forEach(function(res) {
        cardsHTML += `
            <div class="resource-card">
                <div class="resource-tag">${res.tag}</div>
                <div class="resource-title">${res.title}</div>
                <div class="resource-desc">${res.desc}</div>
            </div>
        `;
    });

    content.innerHTML = `
        <div class="resources-title">${STREAMS[currentStream].name} — Study Resources</div>
        <div class="resource-grid">${cardsHTML}</div>
    `;
}


// ================================================
//  11. ROADMAP FUNCTIONS
// ================================================

function buildRoadmap() {
    var content = document.getElementById('roadmapContent');

    var phasesHTML = '';
    ROADMAP_DATA.forEach(function(phase, index) {
        var tasksHTML = '';
        phase.tasks.forEach(function(task) {
            tasksHTML += '<li>' + task + '</li>';
        });

        var lineHTML = (index < ROADMAP_DATA.length - 1) ? '<div class="phase-line"></div>' : '';

        phasesHTML += `
            <div class="phase-row">
                <div class="phase-timeline">
                    <div class="phase-dot">${phase.phase}</div>
                    ${lineHTML}
                </div>
                <div class="phase-card">
                    <div class="phase-title">${phase.title}</div>
                    <div class="phase-duration">${phase.duration}</div>
                    <ul class="phase-tasks">${tasksHTML}</ul>
                </div>
            </div>
        `;
    });

    content.innerHTML = `
        <p class="roadmap-intro">
            This is the 5-phase execution plan for your TechMate AI group project. 
            It covers all four streams: Network Management, Software Development, 
            Cybersecurity, and Cloud Computing. Use this to track your group's weekly progress 
            and divide tasks by stream specialty.
        </p>
        ${phasesHTML}
    `;
}


// ================================================
//  12. XP & GAMIFICATION
// ================================================

function addXp(amount) {
    xp += amount;

    if (xp >= 100) {
        xp = xp - 100;
        showNotification('🎉 Level Up! Keep going!');
    }

    updateXpBar();
}


function updateXpBar() {
    document.getElementById('xpBar').style.width  = xp + '%';
    document.getElementById('xpText').textContent = xp + ' / 100';
}


// ================================================
//  13. NOTIFICATION POPUP
// ================================================

function showNotification(message) {
    var notif = document.getElementById('notification');
    notif.textContent = message;
    notif.classList.remove('hidden');

    setTimeout(function() {
        notif.classList.add('hidden');
    }, 3000);
}


// ================================================
//  14. INPUT AUTO-RESIZE
//  Makes the textarea grow as the user types
// ================================================

var chatInput = document.getElementById('chatInput');

chatInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 140) + 'px';
});

chatInput.addEventListener('keydown', function(e) {
    // Press Enter to send (Shift+Enter for new line)
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});


// ================================================
//  15. START THE APP
//  Nothing runs until the user picks a stream
// ================================================

// The app starts on the splash screen automatically
// Everything else is triggered by selectStream()