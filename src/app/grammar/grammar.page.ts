import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { 
  IonContent, IonHeader, IonToolbar, IonIcon, IonButtons, IonButton, 
  IonSegment, IonSegmentButton, IonLabel, IonBadge 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  arrowBack, terminalOutline, flashOutline, lockClosedOutline,
  fingerPrintOutline, mapOutline, cubeOutline, idCardOutline,
  timeOutline, peopleOutline, alertCircleOutline, briefcaseOutline,
  helpCircleOutline, locationOutline, calendarOutline, repeatOutline,
  layersOutline, calculatorOutline, swapVerticalOutline, playCircleOutline,
  giftOutline, personAddOutline, hourglassOutline, refreshCircleOutline,
  rocketOutline, optionsOutline, barChartOutline, keyOutline,
  thermometerOutline, arrowForwardCircleOutline, watchOutline,
  shieldCheckmarkOutline, walletOutline, chevronForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.page.html',
  styleUrls: ['./grammar.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, 
    IonSegment, IonSegmentButton, IonLabel, IonBadge, CommonModule, FormsModule
  ]
})
export class GrammarPage implements OnInit {

  currentView: 'levels' | 'modules' | 'topic' = 'levels';
  selectedLevel: string | null = null;
  activeTopic: any = null;
  activeTab: 'intel' | 'training' = 'intel';

  levels = [
    { code: 'A1', rank: 'Rookie', status: 'UNLOCKED', progress: '0%' },
    { code: 'A2', rank: 'Cadet', status: 'LOCKED', progress: '0%' },
    { code: 'B1', rank: 'Pilot', status: 'LOCKED', progress: '0%' },
    { code: 'B2', rank: 'Captain', status: 'LOCKED', progress: '0%' },
    { code: 'C1', rank: 'Commander', status: 'LOCKED', progress: '0%' },
    { code: 'C2', rank: 'Legend', status: 'LOCKED', progress: '0%' }
  ];

  // ============================================================
  // BASE DE DATOS MASIVA - CONTENIDO COMPLETO (A1)
  // ============================================================
  topicsA1 = [
    {
      id: 'tobe', title: 'Verb To Be', icon: 'finger-print-outline', desc: 'Identity & Existence',
      intelHTML: `
        <h3>Core Function</h3>
        <p>The verb To Be is your primary tool for defining the world. Used for Identity, Origin, Jobs, Age, Personality, and States.</p>
        
        <div class="data-matrix">
          <div class="row header"><span>Subject</span><span>Positive</span><span>Negative</span></div>
          <div class="row"><span>I</span><span class="highlight">am (I'm)</span><span>am not</span></div>
          <div class="row"><span>He/She/It</span><span class="highlight">is (She's)</span><span>is not (isn't)</span></div>
          <div class="row"><span>You/We/They</span><span class="highlight">are (We're)</span><span>are not (aren't)</span></div>
        </div>

        <h3>Question Logic (The Switch)</h3>
        <ul class="tech-list">
          <li><strong>Statement:</strong> She is a doctor.</li>
          <li><strong>Question:</strong> <em>Is she</em> a doctor?</li>
          <li><strong>Answer:</strong> Yes, she is. / No, she isn't.</li>
        </ul>

        <div class="system-alert warning">
          <strong>CRITICAL ERROR:</strong> Never mix "To Be" with another base verb.<br>
          ❌ She is play happy.<br>
          ✅ She is happy.
        </div>
        <div class="system-alert info">
          <strong>PRO-TIP:</strong> In short answers, do not use contractions for "Yes".<br>
          ❌ Yes, she's.<br>
          ✅ Yes, she is.
        </div>
      `,
      exercises: [
        { q: 'I ___ from Ecuador.', opts: ['am', 'is', 'are'], ans: 'am' },
        { q: 'She ___ a teacher.', opts: ["isn't", "aren't", "am not"], ans: "isn't" },
        { q: 'The dogs ___ in the garden.', opts: ['is', 'are', 'am'], ans: 'are' },
        { q: '___ you a student?', opts: ['Am', 'Are', 'Is'], ans: 'Are' },
        { q: 'Choose correct:', opts: ['My brothers tall', 'My brother\'s tall'], ans: 'My brother\'s tall' }
      ]
    },
    {
      id: 'demonstratives', title: 'Demonstratives', icon: 'map-outline', desc: 'This / That / These / Those',
      intelHTML: `
        <h3>Distance Matrix</h3>
        <p>Used to point out specific people, animals, or objects based on space or time.</p>
        <div class="grid-2x2">
          <div class="card-mini"><span class="label">NEAR (Singular)</span><strong class="val">THIS</strong><small>Touch range / Now</small></div>
          <div class="card-mini"><span class="label">NEAR (Plural)</span><strong class="val">THESE</strong><small>Touch range / Now</small></div>
          <div class="card-mini"><span class="label">FAR (Singular)</span><strong class="val">THAT</strong><small>Visual range / Past</small></div>
          <div class="card-mini"><span class="label">FAR (Plural)</span><strong class="val">THOSE</strong><small>Visual range / Past</small></div>
        </div>

        <h3>Pronunciation Alert</h3>
        <ul class="tech-list">
          <li><strong>THIS /ðɪs/:</strong> Short vowel (like "fish").</li>
          <li><strong>THESE /ðiːz/:</strong> Long vowel (like "cheese") + buzzing "z".</li>
        </ul>

        <div class="system-alert info">
          <strong>Phone Protocol:</strong><br>
          "Hello? <strong>This is</strong> Sarah." (Identify yourself)<br>
          "Who is <strong>that</strong>?" (Ask about the other)
        </div>
      `,
      exercises: [
        { q: '___ is my notebook (Near).', opts: ['This', 'That'], ans: 'This' },
        { q: '___ are my friends over there.', opts: ['These', 'Those'], ans: 'Those' },
        { q: '___ year has been amazing (Current).', opts: ['That', 'This'], ans: 'This' }
      ]
    },
    {
      id: 'articles', title: 'Articles', icon: 'cube-outline', desc: 'A / An / The',
      intelHTML: `
        <h3>Indefinite Articles (A / AN)</h3>
        <p>Used for general singular nouns. Choice depends on <strong>SOUND</strong>, not letter.</p>
        <ul class="tech-list">
          <li><strong>A</strong> + Consonant Sound: <em>A car, A university (Y sound).</em></li>
          <li><strong>AN</strong> + Vowel Sound: <em>An apple, An hour (Silent H).</em></li>
        </ul>

        <h3>Definite Article (THE)</h3>
        <p>Used for specific or unique items (The sun, The book on the table).</p>

        <div class="system-alert warning">
          <strong>ZERO ARTICLE RULE:</strong><br>
          Do not use articles for general plurals or proper names.<br>
          ✅ I love dogs. | ❌ I love the dogs.<br>
          ✅ Sarah lives in France. | ❌ The Sarah...
        </div>
      `,
      exercises: [
        { q: 'I saw ___ elephant.', opts: ['a', 'an', 'the'], ans: 'an' },
        { q: 'He is ___ university student.', opts: ['a', 'an'], ans: 'a' },
        { q: 'Look at ___ sun.', opts: ['a', 'the'], ans: 'the' }
      ]
    },
    {
      id: 'possessives', title: 'Possessives', icon: 'id-card-outline', desc: 'My, Your, His, Her...',
      intelHTML: `
        <h3>Ownership Modifiers</h3>
        <p>Possessive adjectives must <strong>ALWAYS</strong> be followed by a noun. They never stand alone.</p>
        <div class="data-matrix">
          <div class="row"><span>I → <strong>MY</strong></span><span>She → <strong>HER</strong></span></div>
          <div class="row"><span>You → <strong>YOUR</strong></span><span>It → <strong>ITS</strong></span></div>
          <div class="row"><span>He → <strong>HIS</strong></span><span>We → <strong>OUR</strong></span></div>
          <div class="row"><span>They → <strong>THEIR</strong></span><span></span></div>
        </div>

        <h3>Body Parts & Clothes</h3>
        <p>English requires possessives for body parts. <br><em>✅ He broke <strong>his</strong> arm. (Not "the arm").</em></p>

        <div class="system-alert warning">
          <strong>CONFUSION CHECK:</strong><br>
          <strong>ITS</strong> (Possessive) vs <strong>IT'S</strong> (It is)<br>
          <strong>YOUR</strong> (Possessive) vs <strong>YOU'RE</strong> (You are)
        </div>
      `,
      exercises: [
        { q: 'I lost ___ keys.', opts: ['my', 'mine'], ans: 'my' },
        { q: 'The dog drank ___ milk.', opts: ['it\'s', 'its'], ans: 'its' },
        { q: 'Is this ___ bag?', opts: ['you', 'your'], ans: 'your' }
      ]
    },
    {
      id: 'present', title: 'Present Simple', icon: 'time-outline', desc: 'Habits & Facts',
      intelHTML: `
        <h3>Usage Protocols</h3>
        <p>Habits, Routines, General Truths, and Permanent Situations.</p>

        <h3>The Third Person Rule (Positive)</h3>
        <p>For <strong>He, She, It</strong>, the verb changes:</p>
        <ul class="tech-list">
          <li><strong>Standard:</strong> Add -s (Work → Works).</li>
          <li><strong>Ends in -o, -sh, -ch, -x:</strong> Add -es (Go → Goes, Watch → Watches).</li>
          <li><strong>Consonant + Y:</strong> Change to -ies (Study → Studies).</li>
          <li><strong>Have:</strong> Irregular → Has.</li>
        </ul>

        <h3>Auxiliaries (Negative/Question)</h3>
        <div class="system-note">
          Use <strong>DOES</strong> for He/She/It. <br>
          <strong>IMPORTANT:</strong> When "Does" is active, the main verb returns to base form.<br>
          ✅ Does she play? | ❌ Does she plays?
        </div>
      `,
      exercises: [
        { q: 'He ___ football.', opts: ['play', 'plays'], ans: 'plays' },
        { q: 'She ___ TV.', opts: ['watch', 'watches'], ans: 'watches' },
        { q: 'He ___ not eat meat.', opts: ['do', 'does'], ans: 'does' }
      ]
    },
    {
      id: 'plurals', title: 'Plural Nouns', icon: 'people-outline', desc: 'Regular & Irregular Rules',
      intelHTML: `
        <h3>Transformation Rules</h3>
        <ul class="tech-list">
          <li><strong>Most nouns:</strong> Add -s (Cars).</li>
          <li><strong>-s, -x, -ch, -sh:</strong> Add -es (Boxes, Buses).</li>
          <li><strong>Consonant + Y:</strong> -ies (City → Cities).</li>
          <li><strong>-f / -fe:</strong> -ves (Leaf → Leaves, Life → Lives).</li>
        </ul>

        <h3>Irregular & Invariable</h3>
        <div class="data-matrix">
          <div class="row"><span>Man → Men</span><span>Woman → Women</span></div>
          <div class="row"><span>Child → Children</span><span>Person → People</span></div>
          <div class="row"><span>Foot → Feet</span><span>Mouse → Mice</span></div>
          <div class="row"><span>Sheep → Sheep</span><span>Fish → Fish</span></div>
        </div>

        <div class="system-alert info">
          <strong>ALWAYS PLURAL:</strong> Scissors, Jeans, Glasses (Use "A pair of").
        </div>
      `,
      exercises: [
        { q: 'Child → ___', opts: ['Childs', 'Children'], ans: 'Children' },
        { q: 'Box → ___', opts: ['Boxs', 'Boxes'], ans: 'Boxes' },
        { q: 'Leaf → ___', opts: ['Leafs', 'Leaves'], ans: 'Leaves' }
      ]
    },
    {
      id: 'imperatives', title: 'Imperatives', icon: 'alert-circle-outline', desc: 'Commands & Instructions',
      intelHTML: `
        <h3>Command Syntax</h3>
        <p>Used for orders, instructions, advice, or warnings. The subject "You" is implied.</p>
        
        <h3>Structure</h3>
        <ul class="tech-list">
          <li><strong>Affirmative:</strong> Base Verb (<em>Open the door.</em>).</li>
          <li><strong>Negative:</strong> Don't + Base Verb (<em>Don't run.</em>).</li>
          <li><strong>Polite:</strong> Add "Please".</li>
          <li><strong>Suggestion:</strong> Let's + Verb (<em>Let's go.</em>).</li>
        </ul>
        
        <div class="system-alert warning">
          The verb does NOT change. No -s, no -ing.<br>
          ❌ Eats your vegetables.<br>
          ✅ Eat your vegetables.
        </div>
      `,
      exercises: [
        { q: '___ the door.', opts: ['Open', 'Opens'], ans: 'Open' },
        { q: '___ be late.', opts: ['No', 'Don\'t'], ans: 'Don\'t' },
        { q: '___ quiet.', opts: ['Be', 'Is'], ans: 'Be' }
      ]
    },
    {
      id: 'havegot', title: 'Have Got', icon: 'briefcase-outline', desc: 'Possession (UK/Spoken)',
      intelHTML: `
        <h3>Usage</h3>
        <p>Used for possession, relationships, and illnesses. Common in British English.</p>
        
        <div class="data-matrix">
          <div class="row"><span>I/You/We</span><span class="highlight">Have got ('ve got)</span></div>
          <div class="row"><span>He/She/It</span><span class="highlight">Has got ('s got)</span></div>
        </div>

        <h3>Negative & Questions</h3>
        <ul class="tech-list">
          <li><strong>Negative:</strong> Haven't got / Hasn't got.</li>
          <li><strong>Question:</strong> Have you got...? / Has she got...?</li>
        </ul>

        <div class="system-alert warning">
          <strong>LIMITATION:</strong> Only used in Present Tense for possession.<br>
          ❌ I had got a car. (Use "Had")<br>
          ❌ I'm having got lunch. (Use "Having")
        </div>
      `,
      exercises: [
        { q: 'She ___ a new bike.', opts: ['has got', 'have got'], ans: 'has got' },
        { q: 'I ___ any money.', opts: ['haven\'t got', 'don\'t got'], ans: 'haven\'t got' },
        { q: '___ you got a pen?', opts: ['Do', 'Have'], ans: 'Have' }
      ]
    },
    {
      id: 'whquestions', title: 'WH Questions', icon: 'help-circle-outline', desc: 'Information Retrieval',
      intelHTML: `
        <h3>Keywords</h3>
        <div class="grid-2x2">
          <div class="card-mini"><strong class="val">WHO</strong><small>Person</small></div>
          <div class="card-mini"><strong class="val">WHERE</strong><small>Place</small></div>
          <div class="card-mini"><strong class="val">WHEN</strong><small>Time</small></div>
          <div class="card-mini"><strong class="val">WHY</strong><small>Reason</small></div>
          <div class="card-mini"><strong class="val">WHAT</strong><small>Thing</small></div>
          <div class="card-mini"><strong class="val">HOW</strong><small>Manner</small></div>
        </div>

        <h3>Standard Structure</h3>
        <p>WH + Auxiliary + Subject + Verb<br><em>Where do you live?</em></p>

        <div class="system-alert info">
          <strong>SUBJECT QUESTIONS:</strong><br>
          When the WH word is the subject, do NOT use an auxiliary.<br>
          ✅ Who called you? (Not "Who did call you?")
        </div>
      `,
      exercises: [
        { q: '___ is your class?', opts: ['Who', 'When'], ans: 'When' },
        { q: '___ do you live?', opts: ['Where', 'What'], ans: 'Where' },
        { q: '___ called you? (Subject)', opts: ['Who', 'Who did'], ans: 'Who' }
      ]
    },
    {
      id: 'prepplace', title: 'Prep. of Place', icon: 'location-outline', desc: 'In, On, At, Behind...',
      intelHTML: `
        <h3>Coordinates</h3>
        <ul class="tech-list">
          <li><strong>IN:</strong> Enclosed spaces (In a box, In London, In the kitchen).</li>
          <li><strong>ON:</strong> Surfaces (On the table, On the wall, On the floor).</li>
          <li><strong>AT:</strong> Specific points (At the door, At the bus stop).</li>
          <li><strong>BEHIND:</strong> At the back of.</li>
          <li><strong>BETWEEN:</strong> In the middle of two things.</li>
          <li><strong>NEXT TO:</strong> Very close side-by-side.</li>
        </ul>
        
        <div class="system-alert warning">
          <strong>OPPOSITE vs IN FRONT OF:</strong><br>
          In front of = Directly before (Face to back).<br>
          Opposite = Face to Face (Across the street).
        </div>
      `,
      exercises: [
        { q: 'The keys are ___ the bag.', opts: ['on', 'in'], ans: 'in' },
        { q: 'Picture ___ the wall.', opts: ['at', 'on'], ans: 'on' },
        { q: 'She is ___ the door.', opts: ['at', 'in'], ans: 'at' }
      ]
    },
    {
      id: 'preptime', title: 'Prep. of Time', icon: 'calendar-outline', desc: 'In, On, At (Temporal)',
      intelHTML: `
        <h3>Temporal Anchors</h3>
        <div class="data-matrix">
          <div class="row"><span><strong>IN</strong></span><span>Long periods: Months, Years, Seasons, Centuries. (In July, In 2025).</span></div>
          <div class="row"><span><strong>ON</strong></span><span>Days and Dates. (On Monday, On July 10th).</span></div>
          <div class="row"><span><strong>AT</strong></span><span>Exact times, Night, Holidays. (At 5:00, At night, At Christmas).</span></div>
        </div>
        <div class="system-alert info">
          <strong>NO PREPOSITION:</strong> Yesterday, Today, Tomorrow, Next week, Last night.
        </div>
      `,
      exercises: [
        { q: 'I wake up ___ 7:00.', opts: ['in', 'at'], ans: 'at' },
        { q: 'Birthday is ___ July.', opts: ['on', 'in'], ans: 'in' },
        { q: 'Class is ___ Monday.', opts: ['at', 'on'], ans: 'on' }
      ]
    },
    {
      id: 'adverbs', title: 'Adverbs Freq.', icon: 'repeat-outline', desc: 'Always, Usually, Never...',
      intelHTML: `
        <h3>Frequency Scale</h3>
        <p>Always (100%) > Usually > Often > Sometimes > Rarely > Never (0%)</p>
        
        <h3>Positioning Protocols</h3>
        <ul class="tech-list">
          <li><strong>With Main Verbs:</strong> BEFORE the verb.<br><em>I <strong>always</strong> run.</em></li>
          <li><strong>With To Be:</strong> AFTER the verb.<br><em>I am <strong>always</strong> tired.</em></li>
          <li><strong>With Auxiliaries:</strong> Between auxiliary and verb.<br><em>I have <strong>never</strong> seen it.</em></li>
        </ul>
      `,
      exercises: [
        { q: 'I ___ tired.', opts: ['always am', 'am always'], ans: 'am always' },
        { q: 'She ___ at night.', opts: ['studies usually', 'usually studies'], ans: 'usually studies' },
        { q: 'Which is 0% frequency?', opts: ['Rarely', 'Never'], ans: 'Never' }
      ]
    },
    {
      id: 'thereis', title: 'There Is / Are', icon: 'layers-outline', desc: 'Existence Verification',
      intelHTML: `
        <h3>Existence States</h3>
        <p>Used to say something exists. Not for possession.</p>
        <div class="data-matrix">
          <div class="row"><span>Singular / Uncountable</span><span class="highlight">There IS</span></div>
          <div class="row"><span>Plural</span><span class="highlight">There ARE</span></div>
        </div>
        <p><strong>Negative:</strong> There isn't / There aren't.</p>
        <p><strong>Question:</strong> Is there...? / Are there...?</p>
      `,
      exercises: [
        { q: '___ a cat outside.', opts: ['There are', 'There is'], ans: 'There is' },
        { q: '___ many books.', opts: ['There is', 'There are'], ans: 'There are' },
        { q: '___ any milk?', opts: ['Is there', 'Are there'], ans: 'Is there' }
      ]
    },
    {
      id: 'howmuch', title: 'How Much/Many', icon: 'calculator-outline', desc: 'Quantity Analysis',
      intelHTML: `
        <h3>Countability Logic</h3>
        <ul class="tech-list">
          <li><strong>HOW MANY:</strong> Use with Countable Plural nouns.<br><em>Cars, Books, Friends.</em></li>
          <li><strong>HOW MUCH:</strong> Use with Uncountable nouns.<br><em>Water, Money, Time, Sugar.</em></li>
        </ul>
        <div class="system-alert info">
          <strong>Tip:</strong> If you can count it one-by-one (1 chair, 2 chairs), use Many.
        </div>
      `,
      exercises: [
        { q: '___ water is there?', opts: ['How many', 'How much'], ans: 'How much' },
        { q: '___ students are there?', opts: ['How many', 'How much'], ans: 'How many' },
        { q: '___ money do you have?', opts: ['How much', 'How many'], ans: 'How much' }
      ]
    },
    {
      id: 'comparatives', title: 'Comparatives', icon: 'swap-vertical-outline', desc: 'Comparison & Superlatives',
      intelHTML: `
        <h3>Comparative (2 items)</h3>
        <ul class="tech-list">
          <li><strong>Short Adj:</strong> Add <strong>-er</strong> + than (Faster than).</li>
          <li><strong>Long Adj:</strong> <strong>more</strong> + adj + than (More expensive than).</li>
          <li><strong>Ends in Y:</strong> Change to <strong>-ier</strong> (Happier).</li>
        </ul>

        <h3>Superlative (3+ items)</h3>
        <ul class="tech-list">
          <li><strong>Short Adj:</strong> The + <strong>-est</strong> (The tallest).</li>
          <li><strong>Long Adj:</strong> The <strong>most</strong> + adj (The most interesting).</li>
        </ul>

        <div class="system-alert warning">
          <strong>IRREGULAR FORMS:</strong><br>
          Good → Better → The Best<br>
          Bad → Worse → The Worst
        </div>
      `,
      exercises: [
        { q: 'My house is ___ than yours.', opts: ['big', 'bigger'], ans: 'bigger' },
        { q: 'This is the ___ movie.', opts: ['better', 'best'], ans: 'best' },
        { q: 'Today is ___ than yesterday.', opts: ['hotter', 'more hot'], ans: 'hotter' }
      ]
    },
    {
      id: 'presentcont', title: 'Present Continuous', icon: 'play-circle-outline', desc: 'Live Actions (ING)',
      intelHTML: `
        <h3>Status: Active</h3>
        <p>Used for actions happening <strong>NOW</strong>, temporary situations, or current trends.</p>
        
        <div class="system-note">
          <strong>Formula:</strong> Subject + TO BE + Verb-ING<br>
          <em>I am working. / She is sleeping.</em>
        </div>

        <h3>Spelling Rules</h3>
        <ul class="tech-list">
          <li>Drop 'e': Make → Making.</li>
          <li>Double consonant: Run → Running.</li>
          <li>-ie to -y: Lie → Lying.</li>
        </ul>
      `,
      exercises: [
        { q: 'I ___ TV right now.', opts: ['watch', 'am watching'], ans: 'am watching' },
        { q: 'They ___ football.', opts: ['are playing', 'play'], ans: 'are playing' },
        { q: 'She ___ a book.', opts: ['is reading', 'reads'], ans: 'is reading' }
      ]
    },
    {
      id: 'would', title: 'Would', icon: 'gift-outline', desc: 'Politeness & Preferences',
      intelHTML: `
        <h3>Functions</h3>
        <ul class="tech-list">
          <li><strong>Polite Requests:</strong> Would you help me?</li>
          <li><strong>Offers:</strong> Would you like coffee?</li>
          <li><strong>Preferences:</strong> I would like / I would rather.</li>
          <li><strong>Hypothetical:</strong> If I had time, I would travel.</li>
        </ul>
        <div class="system-alert info">
          <strong>Contraction:</strong> 'd (I'd like, He'd go).<br>
          Followed always by <strong>Base Verb</strong>.
        </div>
      `,
      exercises: [
        { q: 'I ___ a coffee, please.', opts: ['like', 'would like'], ans: 'would like' },
        { q: '___ you help me?', opts: ['Do', 'Would'], ans: 'Would' },
        { q: 'She ___ to go.', opts: ['would like', 'like'], ans: 'would like' }
      ]
    },
    {
      id: 'objectpro', title: 'Object Pronouns', icon: 'person-add-outline', desc: 'Action Receivers',
      intelHTML: `
        <h3>Definition</h3>
        <p>Pronouns that replace the object (receiver) of the sentence. They go <strong>AFTER</strong> the verb or preposition.</p>
        
        <div class="grid-2x2">
          <div class="card-mini"><strong class="val">ME</strong><small>(I)</small></div>
          <div class="card-mini"><strong class="val">YOU</strong><small>(You)</small></div>
          <div class="card-mini"><strong class="val">HIM</strong><small>(He)</small></div>
          <div class="card-mini"><strong class="val">HER</strong><small>(She)</small></div>
          <div class="card-mini"><strong class="val">IT</strong><small>(It)</small></div>
          <div class="card-mini"><strong class="val">US</strong><small>(We)</small></div>
          <div class="card-mini"><strong class="val">THEM</strong><small>(They)</small></div>
        </div>
      `,
      exercises: [
        { q: 'Call ___.', opts: ['I', 'me'], ans: 'me' },
        { q: 'I see Ana. I see ___.', opts: ['her', 'she'], ans: 'her' },
        { q: 'Can you help ___?', opts: ['we', 'us'], ans: 'us' }
      ]
    },
    {
      id: 'pasttobe', title: 'Past To Be', icon: 'hourglass-outline', desc: 'Was / Were',
      intelHTML: `
        <h3>Historical States</h3>
        <div class="data-matrix">
          <div class="row"><span>I / He / She / It</span><span class="highlight">WAS</span></div>
          <div class="row"><span>You / We / They</span><span class="highlight">WERE</span></div>
        </div>
        <h3>Structure</h3>
        <ul class="tech-list">
          <li><strong>Negative:</strong> Wasn't / Weren't.</li>
          <li><strong>Question:</strong> Was she...? / Were they...?</li>
        </ul>
        <div class="system-alert warning"><strong>Note:</strong> To Be does NOT use "Did".</div>
      `,
      exercises: [
        { q: 'I ___ at home yesterday.', opts: ['was', 'were'], ans: 'was' },
        { q: 'They ___ happy.', opts: ['was', 'were'], ans: 'were' },
        { q: '___ she sick?', opts: ['Was', 'Were'], ans: 'Was' }
      ]
    },
    {
      id: 'pastsimple', title: 'Past Simple', icon: 'refresh-circle-outline', desc: 'Regular & Irregular',
      intelHTML: `
        <h3>Completed Actions</h3>
        <p>Actions finished at a specific time in the past.</p>
        
        <h3>Verb Forms (Affirmative)</h3>
        <ul class="tech-list">
          <li><strong>Regular:</strong> Add <strong>-ed</strong> (Work → Worked, Play → Played).</li>
          <li><strong>Irregular:</strong> Memorize! (Go → Went, Eat → Ate, See → Saw).</li>
        </ul>

        <h3>Auxiliary DID</h3>
        <p>Use <strong>DID</strong> for Negatives and Questions. The main verb returns to base form.</p>
        <div class="system-note">✅ I didn't go. | ❌ I didn't went.</div>
      `,
      exercises: [
        { q: 'I ___ TV last night.', opts: ['watch', 'watched'], ans: 'watched' },
        { q: 'She ___ to school.', opts: ['go', 'went'], ans: 'went' },
        { q: '___ you study?', opts: ['Did', 'Do'], ans: 'Did' }
      ]
    },
    {
      id: 'future', title: 'Future', icon: 'rocket-outline', desc: 'Will vs Going To',
      intelHTML: `
        <h3>Predictive Models</h3>
        
        <table class="data-grid">
          <tr><th>Form</th><th>Usage</th></tr>
          <tr><td><strong>Be Going To</strong></td><td>Plans decided BEFORE speaking. Predictions with evidence (clouds).</td></tr>
          <tr><td><strong>Will</strong></td><td>Instant decisions. Promises. Opinions/Beliefs.</td></tr>
        </table>
      `,
      exercises: [
        { q: 'I ___ visit my mom (Plan).', opts: ['will', 'am going to'], ans: 'am going to' },
        { q: 'I\'m tired. I ___ sleep.', opts: ['will', 'going to'], ans: 'will' },
        { q: 'It ___ rain (Clouds).', opts: ['will', 'is going to'], ans: 'is going to' }
      ]
    },
    {
      id: 'someany', title: 'Some vs Any', icon: 'options-outline', desc: 'Quantifiers',
      intelHTML: `
        <h3>Usage Protocols</h3>
        <table class="data-grid">
          <tr><th>Word</th><th>Sentences</th></tr>
          <tr><td><strong>SOME</strong></td><td>Affirmative sentences. Offers/Requests (Would you like some...?).</td></tr>
          <tr><td><strong>ANY</strong></td><td>Negative sentences. Questions (Do you have any...?).</td></tr>
        </table>
      `,
      exercises: [
        { q: 'I have ___ apples.', opts: ['some', 'any'], ans: 'some' },
        { q: 'I don\'t have ___ money.', opts: ['some', 'any'], ans: 'any' },
        { q: 'Do you want ___ water?', opts: ['some', 'any'], ans: 'some' }
      ]
    },
    {
      id: 'muchmany', title: 'Much vs Many', icon: 'bar-chart-outline', desc: 'Volume Analysis',
      intelHTML: `
        <h3>Quantity Types</h3>
        <ul class="tech-list">
          <li><strong>MANY:</strong> Countable Plural nouns (Many friends, Many books).</li>
          <li><strong>MUCH:</strong> Uncountable nouns (Much time, Much water).</li>
        </ul>
        <div class="system-alert info">
          Commonly used in Questions and Negatives. In affirmative, native speakers prefer "A lot of".
        </div>
      `,
      exercises: [
        { q: 'How ___ friends do you have?', opts: ['much', 'many'], ans: 'many' },
        { q: 'I don\'t have ___ time.', opts: ['much', 'many'], ans: 'much' },
        { q: 'Did you buy ___ apples?', opts: ['much', 'many'], ans: 'many' }
      ]
    },
    {
      id: 'possessives_s', title: 'Possessive \'s', icon: 'key-outline', desc: 'Owner Linking',
      intelHTML: `
        <h3>Ownership Syntax</h3>
        <p>Used to show ownership. Answers "Whose?".</p>
        <ul class="tech-list">
          <li><strong>Singular:</strong> Add <strong>'s</strong> (Tom's car).</li>
          <li><strong>Regular Plural (-s):</strong> Add <strong>'</strong> only (The students' books).</li>
          <li><strong>Irregular Plural:</strong> Add <strong>'s</strong> (Children's toys).</li>
        </ul>
        <div class="system-alert warning">
          Do not confuse Plural (-s) with Possessive ('s).
        </div>
      `,
      exercises: [
        { q: 'This is ___ book.', opts: ['Ana', 'Ana\'s'], ans: 'Ana\'s' },
        { q: 'The ___ room (students).', opts: ['students\'', 'students\'s'], ans: 'students\'' },
        { q: '___ toys (Children).', opts: ['Childrens\'', 'Children\'s'], ans: 'Children\'s' }
      ]
    },
    {
      id: 'intensifiers', title: 'Intensifiers', icon: 'thermometer-outline', desc: 'Very, Really, Too',
      intelHTML: `
        <h3>Degree Modifiers</h3>
        <ul class="tech-list">
          <li><strong>Very / Really:</strong> Strong but neutral (Very cold).</li>
          <li><strong>Too:</strong> Excessive or Negative result (Too cold to go out).</li>
          <li><strong>Quite:</strong> Moderate (Quite good).</li>
        </ul>
      `,
      exercises: [
        { q: 'The tea is ___ hot to drink.', opts: ['very', 'too'], ans: 'too' },
        { q: 'She is ___ happy.', opts: ['very', 'too'], ans: 'very' },
        { q: 'It was ___ interesting.', opts: ['really', 'too'], ans: 'really' }
      ]
    },
    {
      id: 'prepmove', title: 'Prep. Movement', icon: 'arrow-forward-circle-outline', desc: 'Dynamic Vectors',
      intelHTML: `
        <h3>Motion Vectors</h3>
        <ul class="tech-list">
          <li><strong>To:</strong> Towards a destination.</li>
          <li><strong>Into:</strong> Entering a space.</li>
          <li><strong>Out of:</strong> Exiting a space.</li>
          <li><strong>Across:</strong> Crossing from one side to another.</li>
          <li><strong>Through:</strong> Crossing inside (Through a tunnel).</li>
          <li><strong>Up / Down:</strong> Vertical movement.</li>
        </ul>
      `,
      exercises: [
        { q: 'Go ___ the room.', opts: ['into', 'at'], ans: 'into' },
        { q: 'Walk ___ the street.', opts: ['across', 'through'], ans: 'across' },
        { q: 'Go ___ school.', opts: ['to', 'at'], ans: 'to' }
      ]
    },
    {
      id: 'timeexp', title: 'Time Expressions', icon: 'watch-outline', desc: 'Ago, Last, Next',
      intelHTML: `
        <h3>Temporal Anchors</h3>
        <ul class="tech-list">
          <li><strong>Ago:</strong> Time passed from now (Two days ago). Goes at the end.</li>
          <li><strong>Last:</strong> The most recent past (Last week).</li>
          <li><strong>Next:</strong> The following future (Next month).</li>
          <li><strong>Later:</strong> Future short term (See you later).</li>
        </ul>
      `,
      exercises: [
        { q: 'I saw him 2 days ___.', opts: ['ago', 'last'], ans: 'ago' },
        { q: 'See you ___ week.', opts: ['last', 'next'], ans: 'next' },
        { q: 'Call me ___.', opts: ['later', 'ago'], ans: 'later' }
      ]
    },
    {
      id: 'modals', title: 'Modals', icon: 'shield-checkmark-outline', desc: 'Can / Could',
      intelHTML: `
        <h3>Capabilities & Requests</h3>
        <ul class="tech-list">
          <li><strong>CAN:</strong> Present ability (I can swim) or Permission.</li>
          <li><strong>COULD:</strong> Past ability (I could run) or Polite request (Could you help?).</li>
        </ul>
        <div class="system-alert warning">
          <strong>Rule:</strong> Never use "to" after a modal.<br>
          ❌ I can to swim. ✅ I can swim.
        </div>
      `,
      exercises: [
        { q: 'I ___ swim.', opts: ['can', 'can to'], ans: 'can' },
        { q: '___ you help me? (Polite)', opts: ['Could', 'Can'], ans: 'Could' },
        { q: 'When I was young I ___ run fast.', opts: ['can', 'could'], ans: 'could' }
      ]
    },
    {
      id: 'posspro', title: 'Poss. Pronouns', icon: 'wallet-outline', desc: 'Mine, Yours...',
      intelHTML: `
        <h3>Noun Replacement</h3>
        <p>Replace "Possessive Adj + Noun" to avoid repetition. No noun follows them.</p>
        <div class="data-matrix">
          <div class="row"><span>My book → <strong>MINE</strong></span><span>Your book → <strong>YOURS</strong></span></div>
          <div class="row"><span>His book → <strong>HIS</strong></span><span>Her book → <strong>HERS</strong></span></div>
          <div class="row"><span>Our book → <strong>OURS</strong></span><span>Their book → <strong>THEIRS</strong></span></div>
        </div>
        <div class="system-alert info">There is no form for "Its".</div>
      `,
      exercises: [
        { q: 'This book is ___.', opts: ['my', 'mine'], ans: 'mine' },
        { q: 'Is this ___?', opts: ['your', 'yours'], ans: 'yours' },
        { q: 'The car is ___.', opts: ['theirs', 'their'], ans: 'theirs' }
      ]
    }
  ];

  constructor(private router: Router) {
    addIcons({ 
      arrowBack, terminalOutline, flashOutline, lockClosedOutline,
      fingerPrintOutline, mapOutline, cubeOutline, idCardOutline,
      timeOutline, peopleOutline, alertCircleOutline, briefcaseOutline,
      helpCircleOutline, locationOutline, calendarOutline, repeatOutline,
      layersOutline, calculatorOutline, swapVerticalOutline, playCircleOutline,
      giftOutline, personAddOutline, hourglassOutline, refreshCircleOutline,
      rocketOutline, optionsOutline, barChartOutline, keyOutline,
      thermometerOutline, arrowForwardCircleOutline, watchOutline,
      shieldCheckmarkOutline, walletOutline, chevronForwardOutline
    });
  }

  ngOnInit() {}

  // 1. NIVEL
  selectLevel(code: string) {
    if (code === 'A1') {
      this.selectedLevel = code;
      this.currentView = 'modules';
    } else {
      console.log('ACCESS DENIED');
    }
  }

  // 2. TEMA
  openTopic(topic: any) {
    this.activeTopic = topic;
    this.activeTab = 'intel';
    this.currentView = 'topic';
  }

  // 3. ATRÁS
  handleBack() {
    if (this.currentView === 'topic') {
      this.currentView = 'modules';
      this.activeTopic = null;
    } else if (this.currentView === 'modules') {
      this.currentView = 'levels';
      this.selectedLevel = null;
    } else {
      this.router.navigate(['/home']);
    }
  }

  // 4. EJERCICIOS
  checkAnswer(ex: any, selected: string, card: HTMLElement) {
    card.classList.remove('correct', 'incorrect');
    void card.offsetWidth; 
    
    if (selected === ex.ans) {
      card.classList.add('correct');
    } else {
      card.classList.add('incorrect');
    }
  }
}