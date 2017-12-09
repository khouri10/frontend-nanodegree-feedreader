/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('É definida', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs estão presentes', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                
                var url = allFeeds[i].url;

                expect(url).toBeDefined();
                expect(url).not.toBe('');
            }
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Títulos estão presentes', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                
                var name = allFeeds[i].name;

                expect(name).toBeDefined();
                expect(name).not.toBe('');
            }
        });

    });


    /* New test suite for the menu */
    describe('Menu', function(){
        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('Está escondido por padrão', function() {
             var bodyclass = $('body').attr('class');
             expect(bodyclass).toBe('menu-hidden');
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * have two expectations: the menu display when
          * clicked and it hide when clicked again.
          */
        it('Muda a visibilidade ao ser clicado', function(){
            var iconeMenu = $('.menu-icon-link');
            var body = $('body');
            var bodyclass;

            iconeMenu.click();
            bodyclass = $('body').attr('class');
            expect(bodyclass).not.toBe('menu-hidden');

            iconeMenu.click();
            bodyclass = $('body').attr('class');
            expect(bodyclass).toBe('menu-hidden');

        });
    });


    /* New test suite for Initial Entries */
    describe('Entradas iniciais', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */   
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('Contém pelo menos uma entrada', function(done) {
        
            var entry = $('.entry').html();
            expect(entry).toBeDefined();
            done();
            
        });
    });
   
    /* New test suite for New Feed Selection */
    describe('Seleção de feeds novos', function() {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feed0;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feed0 = $('.feed').html();

                loadFeed(1, function(){
                    done();
                });
                
            });
        });

        it('Conteúdo do feed muda', function(done) {
        
            var feed1 = $('.feed').html();
            expect(feed1).not.toBe(feed0);
            done();
            
        });
    });

}());
