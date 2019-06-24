/*!
    Title: Dev Portfolio Template + Firebase
    Version: 1.2.1
    Last Change: 08/27/2017
    Theme Author: Ryan Fitzgerald
    Contributor: Mark Heramis <chumheramis@gmail.com>
    Theme Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Theme Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/


(function($) {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyA0TA1GDevKrQaroYrkmr-3bFqbQxteYBc",
        authDomain: "fir-demo-7bbf3.firebaseapp.com",
        databaseURL: "https://fir-demo-7bbf3.firebaseio.com/",
        projectId: "fir-demo-7bbf3",
        storageBucket: "",
        messagingSenderId: "1036490490920",
        appId: "1:1036490490920:web:4f50844935fb9f3f"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Get a reference to the database service
    var database = firebase.database();
    
    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });
    firebase.database().ref('name').on('value',(snapshot) => {
        $('#name').append(snapshot.val())
    })

    firebase.database().ref('title').on('value',(snapshot) => {
        $('#title').append(snapshot.val())
    })

    firebase.database().ref('resume-link').on('value',(snapshot) => {
        $('#resume-link').prop('href',snapshot.val())
    })

    firebase.database().ref('about-me').on('value',(snapshot) => {
        $('#about-me-text').append(snapshot.val())
    })

    firebase.database().ref('experience').on('value',(snapshot) => {
        let container = $('#experience-timeline')
        container.empty()
        snapshot.forEach((experience) => {
            let data = experience.val();
            let html = '<div data-date="' + data.date + '">'
            html+= '<h1>' + data.company + '</h1>'
            html+= '<h4>' + data.title + '</h4>'
            html+= '<p>' + data.content + '</p>'
            html+= '</div>'
            container.append(html)
        })
        // Create timeline
        $('#experience-timeline').each(function() {
            $this = $(this); // Store reference to this
            $userContent = $this.children('div'); // user content
            // Create each timeline block
            $userContent.each(function() {
                $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
            });
            // Add icons to each block
            $this.find('.vtimeline-point').each(function() {
                $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
            });
            // Add dates to the timeline if exists
            $this.find('.vtimeline-content').each(function() {
                var date = $(this).data('date');
                if (date) { // Prepend if exists
                    $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
                }
            });
        });
    })
    firebase.database().ref('education').on('value',(snapshot) => {
        let container = $('#education')
        snapshot.forEach((education) => {
            let data = education.val();
            let html = '<div class="education-block">'
            html += '<h3>'+data.school+'</h3>'
            html += '<span class="education-date">' + data.year + '</span>'
            html += '<h4>'+data.course+'</h4>'
            html += '<p>'+data.content+'</p>'
            html += '</div>'

            container.append(html)
        })
    })

    firebase.database().ref('project').on('value',(snapshot) => {
        let container = $('#projects').find('.row')
        snapshot.forEach((project) => {
            let data = project.val()
            let html = '<div class="project shadow-large">'
            html += '<div class="project-image">'
            html += '<img src="'+data.image+'"/>'
            html += '</div>';
            html += '<div class="project-info">'
            html += '<h3>' + data.title + '</h3>'
            html += '<p>' + data.content + '</p>'
            html += '<a href="' + data.link + '">View Project</a>'
            html += '</div>'
            html += '</div>'

            container.append(html)
            
        })
    })




})(jQuery);


