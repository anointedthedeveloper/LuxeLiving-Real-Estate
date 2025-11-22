// Property Single Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get property ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    if (propertyId && properties[propertyId]) {
        loadProperty(properties[propertyId]);
    } else {
        showError('Property not found');
    }
});

function loadProperty(property) {
    // Update page title and meta
    document.title = `${property.title} | ${formatPrice(property.price)} | LuxeLiving Real Estate`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = `${property.title} in ${property.location} - ${property.description.substring(0, 160)}...`;
    }

    // Get agent data
    const agent = getAgentById(property.agentId);
    
    // Build property HTML
    const propertyHTML = `
        <!-- Hero Section -->
        <section class="pt-6 mt-5">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- Breadcrumb -->
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="../index.html">Home</a></li>
                                <li class="breadcrumb-item"><a href="properties.html">Properties</a></li>
                                <li class="breadcrumb-item active">${property.title}</li>
                            </ol>
                        </nav>
                        
                        <!-- Property Header -->
                        <div class="d-flex justify-content-between align-items-start mb-4">
                            <div>
                                <h1 class="display-5 fw-bold text-charcoal mb-2">${property.title}</h1>
                                <p class="lead text-gray mb-3">
                                    <i class="fas fa-map-marker-alt text-emerald me-2"></i>
                                    ${property.address}
                                </p>
                                <div class="d-flex gap-3">
                                    <span class="badge badge-emerald">${formatPrice(property.price)}</span>
                                    <span class="badge badge-primary">${property.status}</span>
                                    <span class="badge badge-accent">${property.type}</span>
                                </div>
                            </div>
                            <div class="text-end">
                                <h3 class="fw-bold text-emerald mb-1">${formatPrice(property.price)}</h3>
                                <p class="text-gray mb-0">$${Math.round(property.price/property.sqft)}/sqft</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Image Gallery -->
                <div class="row mb-5">
                    <div class="col-12">
                        <div class="row g-3">
                            ${property.images.map((img, index) => `
                                <div class="${index === 0 ? 'col-md-8' : 'col-md-4'}">
                                    <img src="${img}" alt="${property.title}" 
                                         class="img-fluid rounded-3 w-100" 
                                         style="height: ${index === 0 ? '500px' : '240px'}; object-fit: cover;">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Property Details -->
                <div class="row">
                    <!-- Main Content -->
                    <div class="col-lg-8">
                        <!-- Overview -->
                        <div class="card border-0 shadow-sm mb-4">
                            <div class="card-body p-4">
                                <h4 class="fw-bold text-charcoal mb-4">Property Overview</h4>
                                <p class="text-gray mb-4">${property.description}</p>
                                
                                <div class="row text-center">
                                    <div class="col-3">
                                        <div class="border rounded-3 p-3">
                                            <i class="fas fa-bed text-emerald fs-2 mb-2"></i>
                                            <h5 class="fw-bold text-charcoal mb-1">${property.bedrooms}</h5>
                                            <p class="text-gray mb-0">Bedrooms</p>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="border rounded-3 p-3">
                                            <i class="fas fa-bath text-emerald fs-2 mb-2"></i>
                                            <h5 class="fw-bold text-charcoal mb-1">${property.bathrooms}</h5>
                                            <p class="text-gray mb-0">Bathrooms</p>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="border rounded-3 p-3">
                                            <i class="fas fa-ruler-combined text-emerald fs-2 mb-2"></i>
                                            <h5 class="fw-bold text-charcoal mb-1">${property.sqft.toLocaleString()}</h5>
                                            <p class="text-gray mb-0">Sq Ft</p>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="border rounded-3 p-3">
                                            <i class="fas fa-car text-emerald fs-2 mb-2"></i>
                                            <h5 class="fw-bold text-charcoal mb-1">${property.parking}</h5>
                                            <p class="text-gray mb-0">Parking</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Amenities -->
                        <div class="card border-0 shadow-sm mb-4">
                            <div class="card-body p-4">
                                <h4 class="fw-bold text-charcoal mb-4">Amenities & Features</h4>
                                <div class="row">
                                    ${chunkArray(property.features, Math.ceil(property.features.length/2)).map(column => `
                                        <div class="col-md-6">
                                            <ul class="list-unstyled">
                                                ${column.map(feature => `
                                                    <li class="mb-2"><i class="fas fa-check text-emerald me-2"></i> ${feature}</li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Additional Details -->
                        <div class="card border-0 shadow-sm mb-4">
                            <div class="card-body p-4">
                                <h4 class="fw-bold text-charcoal mb-4">Property Details</h4>
                                <div class="row">
                                    <div class="col-md-6">
                                        <table class="table table-borderless">
                                            <tr>
                                                <td class="text-gray fw-semibold">Property Type:</td>
                                                <td>${property.type}</td>
                                            </tr>
                                            <tr>
                                                <td class="text-gray fw-semibold">Year Built:</td>
                                                <td>${property.yearBuilt}</td>
                                            </tr>
                                            <tr>
                                                <td class="text-gray fw-semibold">Square Feet:</td>
                                                <td>${property.sqft.toLocaleString()} sqft</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-md-6">
                                        <table class="table table-borderless">
                                            <tr>
                                                <td class="text-gray fw-semibold">Bedrooms:</td>
                                                <td>${property.bedrooms}</td>
                                            </tr>
                                            <tr>
                                                <td class="text-gray fw-semibold">Bathrooms:</td>
                                                <td>${property.bathrooms}</td>
                                            </tr>
                                            <tr>
                                                <td class="text-gray fw-semibold">Parking:</td>
                                                <td>${property.parking} spaces</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Map -->
                        <div class="card border-0 shadow-sm">
                            <div class="card-body p-4">
                                <h4 class="fw-bold text-charcoal mb-4">Location</h4>
                                <div class="bg-light rounded-3 p-4 text-center" style="height: 300px;">
                                    <i class="fas fa-map-marked-alt text-emerald fs-1 mb-3"></i>
                                    <h5 class="text-charcoal mb-2">${property.location}</h5>
                                    <p class="text-gray mb-3">${property.address}</p>
                                    <p class="text-muted">Interactive map would be displayed here</p>
                                    <a href="#" class="btn btn-sm btn-emerald">View on Google Maps</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Sidebar -->
                    <div class="col-lg-4">
                        <!-- Contact Agent -->
                        <div class="card border-0 shadow-sm sticky-top" style="top: 100px;">
                            <div class="card-body p-4">
                                <h4 class="fw-bold text-charcoal mb-4">Contact Agent</h4>
                                
                                <!-- Agent Info -->
                                <div class="d-flex align-items-center mb-4">
                                    <img src="${agent.image}" alt="${agent.name}" class="rounded-circle me-3" width="60" height="60">
                                    <div>
                                        <h5 class="fw-bold text-charcoal mb-1">${agent.name}</h5>
                                        <p class="text-emerald mb-0">${agent.role}</p>
                                    </div>
                                </div>
                                
                                <!-- Agent Stats -->
                                <div class="row text-center mb-4">
                                    <div class="col-4">
                                        <h6 class="fw-bold text-emerald mb-1">${agent.propertiesSold}+</h6>
                                        <small class="text-gray">Sold</small>
                                    </div>
                                    <div class="col-4">
                                        <h6 class="fw-bold text-emerald mb-1">${agent.satisfactionRate}%</h6>
                                        <small class="text-gray">Satisfaction</small>
                                    </div>
                                    <div class="col-4">
                                        <h6 class="fw-bold text-emerald mb-1">${agent.experience}</h6>
                                        <small class="text-gray">Experience</small>
                                    </div>
                                </div>
                                
                                <!-- Contact Form -->
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
                                        <textarea class="form-control" rows="4" placeholder="Tell us about your interest in this property..." required></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-emerald w-100">Send Message</button>
                                </form>
                                
                                <!-- Direct Contact -->
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

        <!-- Similar Properties -->
        <section class="py-6 bg-cream">
            <div class="container">
                <div class="row mb-5">
                    <div class="col-12">
                        <h3 class="fw-bold text-charcoal mb-3">Similar Properties</h3>
                        <p class="text-gray">You might also be interested in these properties</p>
                    </div>
                </div>
                <div class="row g-4" id="similar-properties">
                    ${property.similarProperties.map(similarId => {
                        const similar = properties[similarId];
                        if (!similar) return '';
                        return `
                            <div class="col-lg-4 col-md-6">
                                <div class="property-card card h-100">
                                    <div class="position-relative overflow-hidden">
                                        <img src="${similar.images[0]}" 
                                             class="card-img-top property-image" alt="${similar.title}">
                                        <div class="position-absolute bottom-0 start-0 m-3">
                                            <span class="badge badge-emerald">${formatPrice(similar.price)}</span>
                                        </div>
                                    </div>
                                    <div class="card-body p-4">
                                        <h5 class="card-title fw-bold text-charcoal mb-2">${similar.title}</h5>
                                        <p class="card-text text-gray mb-3">
                                            <i class="fas fa-map-marker-alt text-emerald me-2"></i>
                                            ${similar.location}
                                        </p>
                                        <div class="property-features d-flex justify-content-between text-gray mb-4">
                                            <span><i class="fas fa-bed text-emerald me-1"></i> ${similar.bedrooms} Beds</span>
                                            <span><i class="fas fa-bath text-emerald me-1"></i> ${similar.bathrooms} Baths</span>
                                            <span><i class="fas fa-ruler-combined text-emerald me-1"></i> ${similar.sqft.toLocaleString()} sqft</span>
                                        </div>
                                        <a href="property-single.html?id=${similar.id}" class="btn btn-outline-primary w-100">View Details</a>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </section>
    `;

    // Insert HTML into page
    document.getElementById('property-content').innerHTML = propertyHTML;

    // Add event listeners
    setTimeout(() => {
        const contactForm = document.getElementById('contactAgentForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your interest! The agent will contact you soon.');
                this.reset();
            });
        }
    }, 100);
}

function showError(message) {
    document.getElementById('property-content').innerHTML = `
        <section class="py-5 mt-5">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <i class="fas fa-exclamation-triangle text-warning fs-1 mb-3"></i>
                        <h3 class="text-charcoal mb-3">${message}</h3>
                        <a href="properties.html" class="btn btn-emerald">Back to Properties</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}