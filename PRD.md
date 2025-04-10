# Product Requirements Document (PRD)
Product: Decision-Support Swipe App
Version: MVP 1.1
Prepared by: Alison and Troels
Date: April 2025

## Overview
This app helps users deal with decision fatigue by letting them swipe on choices (like a dating app) and get a single, easy recommendation. It supports both predefined and user-generated decision decks.

## Mission
Let users resolve small decisions easily and quickly

## Success
We're trying to build an experience that users would use several times a week and we'll measure success of the prototype through asking users to rate 1. Will they use the decision 2. Would you use it again 3. Would they recommend to a friend 

## User segment
Age 25-50
Both genders
Working professionals 

## Prototype requirements 

### 1. Overall user experience
As a user I want to be guided through the experience in a way that is fun. 

#### Visual Design
- Color Scheme: Fun, simple, and inviting (specific palette to be proposed)
- No logo or branding elements in MVP
- Cards should have varied background colors by cuisine
- Each card should include:
  - Cuisine name
  - Representative food image
  - Brief description
  - 2-3 popular dishes

#### Round Transitions
At the start of each round I want to be told what to expect in that round in a single sentence in a transition card with the following words: 
- Text: "Round 1" Subtext: "Choose the first 4 options you like" 
- Text: "Round 2" Subtext: "Head to head match up" 
- Text: "Round 3" Subtext: "Final showdown" 

#### Interaction Design
- Tinder-style swiping behavior with similar animations
- No haptic feedback required
- Keyboard navigation support for desktop users
- No back/undo functionality
- Reload website to restart experience
- Cards reshuffled on experience start
- No scrolling required
- Round instructions at top

### 2. Cuisine Options
As a user I want to be able to chose between the following options for dinner tonight with a category name and description:

Each cuisine card should include:
- Name
- Brief description
- Representative image
- 2-3 popular dishes
- Varied background color

Cuisine List:
1. Classic American 
2. Italian
3. Mexican
4. Chinese
5. Japanese
6. Indian
7. Thai
8. Greek
9. French
10. Spanish
11. Korean
12. Vietnamese
13. Middle Eastern
14. Caribbean
15. Brazilian
16. Ethiopian
17. Peruvian
18. Cuban
19. Sushi
20. German

### 3. Decision Algorithm
As a user, I want to get one clear recommendation so I can take action.

#### Algorithm: Swipe Tournament (3-Round Bracket Style)
Think of it like a "mini decision tournament." It keeps people engaged and gives a clear winner in no more than 3 rounds, even with 25+ options.

#### Step-by-Step Flow
1. Round 1: First Swipe Round (Filter)
   - Input: 20 options
   - User swipes through each card once
   - Right = I like it
   - Left = No thanks
   - Automatically advance first 4 liked options
   - If fewer than 4 right swipes: auto-fill randomly from left-swiped options
   - Stop after 4 right swipes

2. Round 2: Face-offs (Mini Battles)
   - Pair up 4 liked options in head-to-head duels
   - Two choices visible at once
   - Winners advance to Final Round

3. Round 3: The Final Showdown
   - Final 2 options in head-to-head duel
   - Announce winner with satisfying animation
   - No specific CTA required in MVP
   - No social sharing in MVP

### 4. Technical Requirements
- Single HTML file, everything client-side
- App-like website experience
- Chrome on iPhone and Android support
- No backend database
- No local storage in MVP
- No analytics in MVP
- No specific meta tags in MVP
- Basic ARIA labels for accessibility

### 5. Feedback System
After completing the experience:
- Separate button to access feedback form
- Rating system (1-5 scale) for:
  1. Will they use the decision
  2. Would they use it again
  3. Would they recommend to a friend
- Open text field for additional feedback
- Email generation on submit:
  - To: alisonc6@gmail.com
  - Subject: "Donezo Feedback"
  - Content: Ratings and feedback text

## Next Steps
1. Design color scheme proposal
2. Curate food images for each cuisine
3. Create cuisine descriptions and popular dishes
4. Implement swipe animations
5. Develop feedback form
6. Test on mobile devices 