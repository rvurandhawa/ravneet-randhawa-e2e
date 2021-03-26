/*
End-to-End test script following:
Visit youtube.com
Search for “The whole working-from-home thing — Apple” and click on this video.
To emulate an actual user’s experience, we want to wait for the whole page to load before continuing with our assertions. To do this, you can wait for a specific network request to complete with the desired status before proceeding. You can use the Cypress documentation to help you go about this.
Assert that the title of the video matches what you searched for previously and that the uploader is indeed “Apple”
*/

// 'YouTubeTestSuite'' is a suite  which contains collection of  test cases to test a particular scenario of youtube
describe('YouTubeTestSuite', function()  {
    //  Visit youtube.com
        it('TestCase1- Visit YouTube', function() {
          cy.wait(2000)
          cy.visit('https://www.youtube.com/')
          cy.log('*********** Visit youtube.com ***********')
        })
    
    /*  Search for "The whole working-from-home thing — Apple"*/
    
    // Enter text in search field
        it('TestCase2- Enter text in search field', function() {
         
          cy.get('[name=search_query]', {timeout: 3000}).should('be.visible')
            .type('The whole working-from-home thing — Apple')
          cy.log('********** Searching for "The whole working-from-home thing — Apple" ************')
        })
    
    // Click on search button to get the result for searched text
        it('TestCase3- Click On search button', function() {
         
          cy.get('#search-icon-legacy').should('be.visible').should('be.enabled').click({ force: true })
          cy.log('********** Retrieving  search result ***********')
        })
    
    
    //  Wait for Whole Page to load and Click on the video
        it('TestCase4- Wait for whole Page to Load and Click on the video', function() {
         
          cy.intercept('GET','https://www.youtube.com/').as('getSettings')
          cy.get('.style-scope.ytd-video-renderer').contains('The whole working-from-home thing — Apple').click()
          cy.wait('@getSettings').its('response.statusCode').should('eq', 200)
          cy.log('************ Video is clicked and getting loaded ***************')
          
        })
    
        
    // Assert if title of video matches with searched text
        it('TestCase5- Verify if title of video matches with previously searched text ', function() {
         
          cy.log('************ Matching the title with searched text **************')
          cy.wait(4000)
          cy.get('.title.style-scope.ytd-video-primary-info-renderer').invoke('text').then((text)=> {
          expect(text.trim()).equal('The whole working-from-home thing — Apple')
    
          }
          )
          
          })
    
    // Assert if the video uploader is Apple    
          it('TestCase6- Verify if uploader is Apple  ', function() {
         
           cy.log('*************Checking the Uploader of video ***********')
           cy.get('.yt-simple-endpoint.style-scope.yt-formatted-string').should('contain','Apple')
          
          })
             
            
        })
        