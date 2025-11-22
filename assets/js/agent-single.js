// Agent Single Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const agentId = urlParams.get('id');
    
    if (agentId && agents[agentId]) {
        loadAgent(agents[agentId]);
    } else {
        showError('Agent not found');
    }
});

function loadAgent(agent) {
    document.title = `${agent.name} - ${agent.role} | LuxeLiving Real Estate`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = `${agent.name} - ${agent.role} at LuxeLiving Real Estate. ${agent.bio.substring(0, 160)}...`;
    }

    const agentHTML = `
        <!-- Page Header -->
        <section class="page-header text-white">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-8 mx-auto text-center">
                        <h1 class="display-3 fw-bold mb-4">${agent.name}</h1>
                        <p class="lead mb-0">${agent.role} - ${agent.location}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Agent Profile -->
        <section class="py-6 bg-cream">
            <div class="container">
                <div class="row">
                    <!-- Main Content -->
                    <div class="col-lg-8">
                        <!-- Profile Card -->
                        <div class="card border-0 shadow-sm mb-4">
                            <div class="card-body p-4">
                                <div class="row align-items-center">
                                    <div class="col-md-4 text-center">
                                        <img src="${agent.image}" alt="${agent.name}" class="team-image mb-3">
                                        <div class="agent-stats d-flex justify-content-around mb-3">
                                            <div class="text-center">
                                                <h4 class="fw-bold text-emerald mb-1">${agent.propertiesSold}+</h4>
                                                <small class="text-gray">Properties Sold</small>
                                            </div>
                                            <div class="text-center">
                                                <h4 class="fw-bold text-emerald mb-1">${agent.satisfactionRate}%</h4>
                                                <small class="text-gray">Satisfaction</small>
                                            </div>
                                            <div class="text-center">
                                                <h4 class="fw-bold text-emerald mb-1">${agent.experience}</h4>
                                                <small class="text-gray">Experience</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <h3 class="fw-bold text-charcoal mb-3">About ${agent.name.split(' ')[0]}</h3>
                                        <p class="text-gray mb-4">${agent.bio}</p>
                                        
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="fw-bold text-charcoal mb-3">Specialties</h5>
                                                <div class="d-flex flex-wrap gap-2 mb-4">
                                                    ${agent.specialties.map(specialty => `
                                                        <span class="badge badge-primary">${specialty}</span>
                                                    `).join('')}
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <h5 class="fw-bold text-charcoal mb-3">Languages</h5>
                                                <div class="d-flex flex-wrap gap-2 mb-4">
                                                    ${agent.languages.map(lang => `
                                                        <span class="badge badge-emerald">${lang}</span>
                                                    `).join('')}
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Contact Info -->
                                        <div class="bg-light rounded-3 p-4">
                                            <h5 class="fw-bold text-charcoal mb-3">Contact Information</h5>
                                            <div class="row">
                                                <div class="col-md-6 mb-2">
                                                    <i class="fas fa-phone text-emerald me-2"></i>
                                                    <span class="text-gray">${agent.phone}</span>
                                                </div>
                                                <div class="col-md-6 mb-2">
                                                    <i class="fas fa-envelope text-emerald me-2"></i>
                                                    <span class="text-gray">${agent.email}</span>
                                                </div>
                                                <div class="col-md-6 mb-2">
                                                    <i class="fas fa-map-marker-alt text-emerald me-2"></i>
                                                    <span class="text-gray">${agent.location}</span>
                                                </div>
                                                <div class="col-md-6 mb-2">
                                                    <i class="fas fa-graduation-cap text-emerald me-2"></i>
                                                    <span class="text-gray">${agent.education}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Awards & Recognition -->
                        <div class="card border-0 shadow-sm mb-4">
                            <div class="card-body p-4">
                                <h4 class="fw-bold text-charcoal mb-4">Awards & Recognition</h4>
                                <div class="row">
                                    ${agent.awards.map(award => `
                                        <div class="col-md-6 mb-3">
                                            <div class="d-flex align-items-center">
                                                <i class="fas fa-award text-emerald fs-4 me-3"></i>
                                                <div>
                                                    <h6 class="fw-bold text-charcoal mb-1">${award}</h6>
                                                    <p class="text-gray mb-0">LuxeLiving Real Estate</p>
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <!-- Current Listings -->
                        <div class="card border-0 shadow-sm">
                            <div class="card-body p-4">
                                <h4 class="fw-bold text-charcoal mb-4">Current Listings</h4>
                                <div class="row g-4" id="agent-listings">
                                    ${agent.currentListings.map(propertyId => {
                                        const property = properties[propertyId];
                                        if (!property) return '';
                                        return `
                                            <div class="col-md-6">
                                                <div class="property-card card h-100">
                                                    <div class="position-relative overflow-hidden">
                                                        <img src="${property.images[0]}" 
                                                             class="card-img-top property-image" alt="${property.title}">
                                                        <div class="position-absolute bottom-0 start-0 m-3">
                                                            <span class="badge badge-emerald">${formatPrice(property.price)}</span>
                                                        </div>
                                                    </div>
                                                    <div class="card-body p-4">
                                                        <h5 class="card-title fw-bold text-charcoal mb-2">${property.title}</h5>
                                                        <p class="card-text text-gray mb-3">
                                                            <i class="fas fa-map-marker-alt text-emerald me-2"></i>
                                                            ${property.location}
                                                        </p>
                                                        <div class="property-features d-flex justify-content-between text-gray mb-4">
                                                            <span><i class="fas fa-bed text-emerald me-1"></i> ${property.bedrooms} Beds</span>
                                                            <span><i class="fas fa-bath text-emerald me-1"></i> ${property.bathrooms} Baths</span>
                                                            <span><i class="fas fa-ruler-combined text-emerald me-1"></i> ${property.sqft.toLocaleString()} sqft</span>
                                                        </div>
                                                        <a href="property-single.html?id=${property.id}" class="btn btn-outline-primary w-100">View Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div class="col-lg-4">
                        <!-- Contact Form -->
                        <div class="card border-0 shadow-sm sticky-top" style="top: 100px;">
                            <div class="card-body p-4">
                                <h4 class="fw-bold text-charcoal mb-4">Contact ${agent.name.split(' ')[0]}</h4>
                                <form id="contactAgentForm">
                                    <div class="mb-3">
                                        <label class="form-label">Your Name</label>
                                        <input type="text" class="form-control" placeholder="Enter your name" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Email Address</label>
                                        <input type="email" class="form-control" placeholder="Enter your email" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Phone Number</label>
                                        <input type="tel" class="form-control" placeholder="Enter your phone">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Message</label>
                                        <textarea class="form-control" rows="4" placeholder="Tell us how we can help you..." required></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-emerald w-100">Send Message</button>
                                </form>
                                
                                <div class="mt-4 pt-4 border-top">
                                    <div class="row text-center">
                                        <div class="col-6">
                                            <a href="tel:${agent.phone}" class="btn btn-outline-primary w-100 mb-2">
                                                <i class="fas fa-phone me-2"></i>Call
                                            </a>
                                        </div>
                                        <div class="col-6">
                                            <a href="mailto:${agent.email}" class="btn btn-outline-emerald w-100 mb-2">
                                                <i class="fas fa-envelope me-2"></i>Email
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    document.getElementById('agent-content').innerHTML = agentHTML;

    setTimeout(() => {
        const contactForm = document.getElementById('contactAgentForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert(`Thank you! ${agent.name.split(' ')[0]} will contact you soon.`);
                this.reset();
            });
        }
    }, 100);
}

function showError(message) {
    document.getElementById('agent-content').innerHTML = `
        <section class="py-5 mt-5">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <i class="fas fa-exclamation-triangle text-warning fs-1 mb-3"></i>
                        <h3 class="text-charcoal mb-3">${message}</h3>
                        <a href="agents.html" class="btn btn-emerald">Back to Agents</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}