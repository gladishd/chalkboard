const course = [
  // when creating the courses, we also want to specify the ID.
  {
    courseName: 'Econ 201',
    size: 30,
    courseIntro:
      'Introduction to the Course \n 1. Keynesian Theory \n 2. The Solow Growth Model',
    courseMoreInformation:
      "The Solow Growth Model \n What you can expect from me: I'll always be on time, prepared and available for office hours, and I will be fair. \n What I expect from you: When assigned to a group project, work cooperatively. \n Grading will be done on the following scale: \n Rubric: (A) Attends class regularly and contributes, (B), attends class and sometimes analyzes relevant issues, (C) attends class regularly but almost never contributes, (D/R) attends class regularly but never contributes. \n Assignment description: This is just a short intro to the Solow model of economic growth and how it relates to our modern conception of money as a form of fiat currency as well as the departure from traditional neoclassical economics.",
    courseSchedule:
      'Schedule: \n M, W, F \n 10:00am - 11:00am \n T, Th \n 1:30pm - 3:00pm',
    id: 1
  },
  {
    courseName: 'Guitar 101',
    size: 3,
    courseIntro:
      'Introduction to the Course \n 1. Welcome to guitar \n 2. The Basics of Guitar',
    courseMoreInformation:
      "The Art of Playing the Guitar \n What you can expect from me: I'll always be playing beautiful songs all the time, no problem. \n What I expect from you: I expect you to be inherently musically talented in order to attend the course. \n Grading will be done on the following scale: \n Rubric: (A) Attends class regularly and contributes, (B), attends class and sometimes analyzes relevant issues, (C) attends class regularly but almost never contributes, (D/R) attends class regularly but never contributes. \n Assignment description: This is just a short intro to how to play the guitar, from quality instructors and the most understanding curriculum, based not on an arbitrary ruleset but on the shoulders of musical giants.",
    courseSchedule:
      'Schedule: \n M, W, F \n 11:00am - 12:00pm \n T, Th \n 2:30pm - 3:30pm',
    id: 2
  },
  {
    courseName: 'Senior Coding 404',
    size: 14,
    courseIntro:
      'Introduction to the Course \n 1. Welcome to Coding 404 \n 2. Foundations \n 3. Junior Phase \n 4. Senior Phase',
    courseMoreInformation:
      "Welcome to the third Fullstack Academy \n What you can expect from me: I'm going to be available, a lot of instructors are going to be on here so that we can help students. \n What I expect from you: I don't expect you to know how to code, instead this is about being culturally ingrained in the fundamentals of coding culture.  I want you to know this so that you're not surprised.  Also, I want to talk about grading.  \nGrading will be done on the following scale: \n Rubric: (A) Attends class regularly and contributes, (B), attends class and sometimes analyzes relevant issues, (C) attends class regularly but almost never contributes, (D/R) attends class regularly but never contributes. \n Assignment description: From knowledgeable instructors we have a collection of projects which you can choose from yourself, including projects like this one.  When the live lecture starts you'll be able to get started, for now I would recommend going on codewars since the assignment description will be posted soon.",
    courseSchedule:
      'Schedule: \n M, W, F \n 9:00am - 10:00am \n T, Th \n 12:30pm - 2:00pm',
    id: 3
  },
  {
    courseName: 'REACTO 202',
    size: 14,
    courseIntro:
      'Introduction to the Course \n 1. Welcome to our class on the REACTO method \n 2. Discussion \n 3. Resources \n 4. AlgoExpert',
    courseMoreInformation:
      "Repeat - Examples - Approach - Code - Test - Optimization \n The REACTO approach is what allows us to solve interview questions.  You can expect us to have daily assignments in order to meet the demands of the interviewers.  \n You'll need to write out examples, describe your approaches.  \n Fitting the interview environment, which is fundamentally interactive in its nature, you don't want to reach the coding step until you've done the previous. \n Pseudocode, testing, and finally optimization (think, with respect to runtime and the necessity of all of the code), are all essential to this method.",
    courseSchedule:
      'Schedule: \n M, W, F \n 8:00am - 9:00am \n T, Th \n 3:30pm - 5:00pm',
    id: 4
  },
  /*   {
    courseName: 'Vampires in Literature and Cinema',
    size: 30,
    courseIntro:
      "The growing popularity of vampires in popular media should make many students out there pretty jealous they can't take this class focusing on the infamous bloodsuckers.",
    courseMoreInformation:
      'Sorry. There is no a hands-on lab section in this class. It does, however, come with ample opportunities for discussion. About 30 undergraduates will get a taste of how cultures spread through one of the world’s most potent and long-lived icons. The subject is the vampire, and the venue will be a new course, The Vampire in Literature and Cinema.',
    courseSchedule:
      'Schedule: \n M, W, F \n 9:00am - 10:00am \n T, Th \n 4:30pm - 6:00pm',
    id: 5
  }, */
  {
    courseName: 'Elvish, the language of LOTR',
    size: 40,
    courseIntro:
      "This course was taught by the world's foremost expert on this language, who was even a consultant to the makers of the films. While not practical, it certainly speaks to super fans of the series. ",
    courseMoreInformation:
      'Fans in the Madison, Wisconsin area with a desire to learn elvish might be interested to know that the University of Wisconsin has created a mini course on Sindarin to be taught by UW grad David Salo this spring. There are only a few spots left, so anyone wishing to enroll should check it out here. ',
    courseSchedule:
      'Schedule: \n M, W, F \n 10:00am - 11:00am \n T, Th \n 5:30pm - 7:00pm',
    id: 6
  },
  {
    courseName: 'Daytime Serials: Family & Social Roles',
    size: 55,
    courseIntro:
      "Students in Wisconsin can take this course that explores the familial relationships of characters on soap operas–essential for those who just can't get enough of their programs.",
    courseMoreInformation:
      "Analysis of the themes and characters that populate television's daytime serials and investigation of what impact these portrayals have on women's and men's roles in the family and in the work place. The course will compare and contrast prime-time programs with daytime serials for these themes.",
    courseSchedule:
      'Schedule: \n M, W, F \n 12:00am - 1:00pm \n T, Th \n 7:30pm - 9:00pm',
    id: 7
  },
  {
    courseName: 'Information Radio',
    size: 60,
    courseIntro:
      'Radio continuity writing, script editing, information gathering and preparation, program planning and editing, and voicing techniques; emphasis on public information and educational programming. ',
    courseMoreInformation:
      'Radio continuity writing, script editing, information gathering and preparation, program planning and editing, and voicing techniques; emphasis on public information and educational programming. ',
    courseSchedule:
      'Schedule: \n M, W, F \n 1:00pm - 2:00pm \n T, Th \n 8:30pm - 10:00pm',
    id: 8
  },
  /*   {
    courseName: 'To Hogwarts, Harry: A Study of Harry Potter',
    size: 65,
    courseIntro:
      "If you're taking the train to Hogwarts, you'll want to catch your ride at the King's Cross Station Platform 9 3/4. You'll also want to be fairly confident in your ability to phase through brick walls. If, on the other hand, you study at Central Michigan University, any number of Amtrak lines will get you to the East Lansing campus. No phasing should be necessary.",
    courseMoreInformation:
      "Regardless of which of these fine institutions you choose, you'll have the chance to learn everything you need to know about the most famous prepubescent wizard in the world. This Spring Semester course is more than spells and magic though. J.K. Rowling is not only the author of the Harry Potter series but also the creator of a rich and broad meta-fictional universe. Drawn as it is from the sights and sounds of Great Britain, the Harry Potter saga readily lends itself to an immersive cultural experience. Far from just another literature course, 'To Hogwarts Harry' offers students the chance to take this immersion to the next level. Participants will jet to England to follow in Harry's footsteps, to behold the Scottish glen where Hagrid's Hut stood, to shop at the Leadenhall Market that gave inspiration to Diagon Alley, to cross the threshold of Oxford's Christ Church, which inspired the Great Hall at Hogwarts. Like Hogwarts itself, this two week course is rather exclusive, reserved as it is for honors English students only. Unlike Hogwarts, students are hardly ever dragged into the woods by giant man-eating spiders or mauled by werewolves. If that isn't motive enough, you should know that this study-abroad program will also net you three credits.",
    courseSchedule:
      'Schedule: \n M, W, F \n 2:00pm - 3:00pm \n T, Th \n 9:30pm - 11:00pm',
    id: 9
  }, */
  {
    courseName: 'Wasting Time on the Internet',
    size: 70,
    courseIntro:
      "On its surface, “Wasting Time on the Internet” sort of seems like a class where you don't do anything. Upon closer inspection, that's pretty much exactly what it is. This is probably the kind of thing that only Ivy Leaguers could receive credits to do.",
    courseMoreInformation:
      "For three hours every Wednesday, students will meet together in a room and completely ignore each other while wandering aimlessly about the web, attempting to bring cohesion to the chat room flotsam and social media jetsam bobbing about in the virtual sea. This course asks if there is a way to cull meaningful literary content from the temporal Tweets, fleeting Facebook posts, and casual comments with which we splatter the web. Supporting its endeavor through consideration of works by thinkers like Betty Friedan, Erving Goffman, and John Cage, the course attempts intellectual interface with the concepts of boredom and time-wasting. In most contexts, the required coursework would be considered a good way to blow a perfectly useful day. In this context, it is an elective seminar for English majors. And if you're in the Creative Writing Track at UPenn, you're degree program actually requires you to dedicate three hours a week to be wasted on the web.",
    courseSchedule:
      'Schedule: \n M, W, F \n 3:00pm - 4:00pm \n T, Th \n 10:30pm - 12:00am',
    id: 10
  },
  {
    courseName: 'California Here We Come',
    size: 10,
    courseIntro:
      "If you show up to your 'California Here We Come' class looking for a thoughtful reading of John Steinbeck, there will be absolutely nothing we can say to console you for what you are about to experience. If you're keeping track, The O.C. probably ranks somewhere just below Dawson's Creek and maybe a tiny shade above Party of Five on the list of teen dramas that we'd rather gouge our eyes out than watch, but that's just us.",
    courseMoreInformation:
      "For those enrolled in this Duke University class, The O.C. is existential gold. According to its Fall 2012 syllabus, the course will “explore the ‘hyper self-awareness' unique to the O.C. and analyze California exceptionalism and singularity in history and popular culture.” Stated more simply, the course examines why really attractive and rich people living near a beach in a place that's warm and sunny all the time think they're awesome. Of course, there's more to it than that. The course also examines pressing modern matters such as “girl culture, 21st century suburban revivalism, the indie music scene, the meta-series, and more.” These, of course, are the features by which The O.C. “changed teen television dramedy forever.” Just in case watching episodes of The O.C. in class doesn't seem like the greatest cerebral challenge you'll face in college, this class ups the ante by also including analytical discussion of cultural touchstones like Real Housewives of Orange County and The Hills. As The O.C. producer Josh Schwartz says (according to the syllabus), “we live in a post-everything universe.” This sentence, of course, means absolutely nothing. But don't let that stop you from taking an English course in which you dive headlong into bad television in search of post-everything meaning.",
    courseSchedule:
      'Schedule: \n M, W, F \n 5:00pm - 6:00pm \n T, Th \n 12:30am - 2:00am',
    id: 11
  },
  {
    courseName: 'Physics of Star Trek',
    size: 25,
    courseIntro:
      "Memorizing every word in the Klingon-to-English Dictionary is not required for this course but it probably wouldn't hurt. Outside of that, you'll want a pretty good working knowledge of particle physics, human physiology, and interplanetary travel.",
    courseMoreInformation:
      'Indeed, this course is listed as part of the science discipline at Santa Clara. Thus, the class will draw a line from Newton and Einstein to Kirk and Janeway. But like Star Trek itself, there is so much more to this than science. If six television series, 11 films, and countless Trekkie conventions have shown us anything, it is the complex and inextricable relationship between technology, faith, identity, and culture. Star Trek shows us a future in which science has given us both glimpses of Utopia and our own destruction. This Santa Clara course peers into that future while exploring the empirical science behind the matter transporter, the theoretical basis for time travel, and possibly even the reason that Patrick Stewart lacks the resources to grow a single follicle of hair well into the 24th Century. The Physics of Star Trek is a great starting point for a job at NASA, construction of a super-large hadron collider, or chief-know-it-all status at your neighborhood comic shop.',
    courseSchedule:
      'Schedule: \n M, W, F \n 7:00pm - 8:00pm \n T, Th \n 2:30am - 4:00am',
    id: 12
  },
  {
    courseName: 'Astrobiology',
    size: 40,
    courseIntro:
      'This course of study explores that other great Trekkian question: Are there Ferengis in the universe and how cautious should we be about conducting interplanetary commerce with them?',
    courseMoreInformation:
      "Well, maybe that isn't central premise of this course. But if you do ever plan on successfully answering this and other related questions, you should probably start here. Astrobiology is not merely a course at the University of Washington. In fact, it is a graduate program for which one can earn a PhD. According to its online course catalog, the University of Washington is not the only major institution to offer courses that aim to study life on or from other planets. It is, however, one of the very few to provide “structured interdisciplinary training at the graduate level.” The University points out that, with an offering of 20 required coursework credits, its astrobiology program is one of the nation's most rigorous. Subjects of study include the origin and evolution of life on earth, the search for planets beyond our solar system, and the sustainability of life in extreme environments such as deep-sea hydrothermal vents, Arctic ice, and Cleveland. (Just kidding Cleveland. We love you). Ecology, cosmology, geology, and imagination converge in a course that could be your first step toward a space odyssey. Future occupations include microbiology, environmental conservation, and Martian ambassadorship.",
    courseSchedule:
      'Schedule: \n M, W, F \n 8:00pm - 9:00pm \n T, Th \n 3:30am - 5:00am',
    id: 13
  },
  {
    courseName: 'Entertainment Engineering & Design',
    size: 45,
    courseIntro:
      'Making fun is big business. People expect more than just a few white tigers and a Bette Midler impersonator these days. They want flashing lights, optical illusions, and animatronic spectacle…and then, of course, the occasional Bette Midler impersonator.',
    courseMoreInformation:
      "If you're at all interested in helping to enhance the massive adult playground that is Las Vegas, or to work as a Disney fun-gineer, or perhaps to design the next big-screen innovation used to justify doubling ticket prices, this could be the degree program for you. According to UNLV, you have two basic options. You can earn a bachelor's degree in Design Technology at a total of 133 credits or one in Engineering across 135 credit hours. Be assured, this course of study is deeply embedded in various overlapping scientific disciplines. In spite of the whimsy that it would be your ultimate ambition to create, the program itself will guide you through the very real and very serious subsets of computer, electrical, mechanical, and civil engineering science. All are instructed with an eye toward “the art of entertainment.” In addition to a core emphasis on mathematics and the development of technical skills, this course of study will require you to consider the social, environmental, political, ethical, and economic implications of each and every decision that goes into creating an entertaining experience for the buying public. Whether you hope to design a multi-purpose indoor arena or produce the lighting effects for a Lada Gaga tribute act, this may be the degree program for you. Also, if it is your life's greatest ambition to run away with the French circus, you should know that this major provides a clear avenue to an internship with Cirque du Soleil.",
    courseSchedule:
      'Schedule: \n M, W, F \n 9:00pm - 10:00pm \n T, Th \n 4:30am - 6:00am',
    id: 14
  },
  {
    courseName: 'Turfgrass Science',
    size: 50,
    courseIntro:
      "Football is kind of a big deal in Happy Valley. So too, therefore, is grass. It makes sense, then, that the university's Department of Plant Science, which itself is contained in the College of Agricultural Sciences, has offered a full undergraduate degree program in Turfgrass Science since as far back as 1929.",
    courseMoreInformation:
      "Lest you should think this is a path toward becoming a glorified lawn-mower, be thee fairly warned. Your course of study will include biology, chemistry, and meteorology. This bachelor's degree program gives students on the gridiron-crazy Pennsylvania campus a chance to pursue an array of career opportunities in the field (Yeah, it's a pun. Deal with it). Those career opportunities may include golf course green's keeping, sod design, and athletic facility maintenance. And with everything that you'll learn about cultivation, protection against the elements, and pest management, your front lawn will likely be the envy of your neighbors. Based on the university's own reporting that 70% of Pennsylvania's turfgrass is residentially-owned, you need not work for a professional sporting organization to apply everything that you'll learn in this program. However, it could also open the door to such a career. To the point, Penn State's Turfgrass degree program could lead to an internship with the NFL's nearest organization, the Philadelphia Eagles. But prepare yourself for a rigorous course steeped in both natural and industrial sciences. The Philadelphia Eagles may be giving away wide receiver jobs to every stone-handed bumbler that wanders into their training facilities but you actually have to work pretty hard to maintain the grass underneath their feet.",
    courseSchedule:
      'Schedule: \n M, W, F \n 10:00pm - 11:00pm \n T, Th \n 5:30am - 7:00am',
    id: 15
  },
  {
    courseName: 'Bowling Industry Management and Technology',
    size: 45,
    courseIntro:
      "Ok. we admit it. We reference The Big Lebowski at least once a week on this forum. But seriously, this one is just begging for it. Anyway, if Walter Sobchack hadn't spent the ‘70s in Vietnam, this is probably the college major that he would have pursued.",
    courseMoreInformation:
      "Vincennes is Indiana's oldest university, operational since 1801. And based on the mission statement for its academic bowling program, this is one sport that students and faculty take quite seriously. Indeed, it is told that this program will do nothing less than “enhance the student's intellectual growth and civic responsibilities through interaction with community groups and organizations as it relates to a modern business/recreational environment.” This, says the mission, “will prepare them for employment in the bowling industry.” So, too, will classroom subjects such as profit/loss analysis for a given bowling alley, pinsetter preventative maintenance, and fingerhole-drilling. That last one is not as dirty as it sounds. Get your mind out of the gutter. Depending on your focus within your bowling major, you can complete this two year program in pursuit of either an Associate of Science or an Associate of Applied Science degree. The latter of these will require more technical expertise whereas the former emphasizes the business management dimensions of life on the lanes. And Walter Sobchack would be pleased to know that most classes are conducted on weekdays, meaning that there should never be a reason to roll on Shabbos.",
    courseSchedule:
      'Schedule: \n M, W, F \n 11:00pm - 12:00am \n T, Th \n 6:30am - 8:00am',
    id: 16
  },
  {
    courseName: 'Adventure Education',
    size: 60,
    courseIntro:
      "This teaches you half of everything you'll ever need to know to become an action hero. Add to this about 30 foreign language courses and a decade of training in the lethal use of martial arts, and you're practically Jason Bourne. Learn all the skills that your crazy survivalist uncle has been telling you about for years. From mountaineering and whitewater kayaking to winter camping and wilderness exploration, this course of study requires you to venture into the great outdoors with only your wit and wisdom to protect you.",
    courseMoreInformation:
      "Surrounded as it is by the natural majesty of New Hampshire, the Plymouth State campus serves as the perfect starting point for any number of exhilarating expeditions out into the Granite State frontier. To get an idea of what you might be in for on an average school day, consider several fairly self-explanatory course names, including Winter Backcountry Travel, Alpine Mountaineering, and Canoe Paddling Fundamentals. Of course, if you plan on pursuing this course of study—which is offered both at the bachelor's and master's levels—it's probably a good idea to be comfortable with heights, extreme temperatures, and complaining children. Indeed, Adventure Education falls under the umbrella of Physical Education and its primary purpose is to provide applied training to those who will ultimately lead youth expeditions through forests, rivers, and mountains. A career may await you in any from a number of exciting fields, including national park recreation, environmental education, outdoor adventure leadership, and of course, international secret espionage super-agency.",
    courseSchedule:
      'Schedule: \n M, W, F \n 12:00am - 1:00am \n T, Th \n 7:30am - 9:00am',
    id: 17
  },
  {
    courseName: 'Arctic Engineering',
    size: 65,
    courseIntro:
      "If you enjoy doing really complicated math while freezing your face off, this is most definitely the major for you. Civil engineering is a deeply challenging course of study in any context. Throw in a subzero climate and you're looking at a whole other level of logistical challenges relating to heat transfer, frozen ground engineering, and toilet flushing.",
    courseMoreInformation:
      "Seriously. Do you have any idea how hard it is to make a toilet that flushes at absolute zero? Neither do we but we'll bet this is the course of study if you want to know. Unfortunately, while this program is listed in the course catalog, it is labeled as temporarily suspended at the time of writing. When the master's program is available though, it is administered from within the College of Engineering and Mines' Department of Civil and Environmental Engineering. The graduate program is aimed at those who have already status their undergraduate studies in engineering and who wish to apply this education to confronting the peculiarities of extreme cold weather design, construction, and operation. As the course catalog points out, a heightened interest in petroleum production in Arctic regions has increased demand for those with the set of skills honed by the program in question. This is probably a program that you would also find valuable were you to somehow be a part of a Star Wars-style rebellion forced to establish a secret base on the ice planet of Hoth. The course's focus on hydraulic engineering should give you a leg up for either operating or felling an Imperial AT-AT Walker. Though the program is not presently available to students on the Fairbanks campus, fear not. It's pretty darn cold in Alaska and people are always building stuff. It stands to reason that the inherent value of this degree program will see it offered again in the not-too-distant future. Certainly if that future brings a new ice age with it, degree-holders in Arctic Engineering will be pretty sought after.",
    courseSchedule:
      'Schedule: \n M, W, F \n 1:00am - 2:00am \n T, Th \n 8:30am - 10:00am',
    id: 18
  },
  {
    courseName: 'Bagpiping',
    size: 70,
    courseIntro:
      "The Liverpool Hope University offers a degree program called The Beatles, Popular Music and Society. But we suppose this isn't so unique or surprising. Courses on the Beatles, and on popular music, are actually quite commonplace.",
    courseMoreInformation:
      "But this isn't about popular music. This is about unpopular music. This is about the music best suited for emptying a saloon after last call. Don't get me wrong. We are lovers of all things musical. But we'd shake on a gentleman's bet that 30 minutes of live bagpiping, and you'd be gone like a Hagas on Hogmanay. This university's bagpiping program's existence owes itself almost entirely to the Scottish-American heritage of the university's namesake, Andrew Carnegie. Its commitment to an instrument that might best be described as the sound of sick cats being tortured makes this Pittsburgh-based university the top destination in the U.S. for aspiring bagpipers. As the only university to offer a Master's degree in the bags, Carnegie Mellon will draw as many as three piping aspirants every year. Three may not sound like a lot, but put all of them in a room together with their instruments and I guarantee it'll feel like a crowd. According to an article from 2012, Carnegie's recently hired pipemaster general had also made considerable strides in expanding the membership of the university's competitive pipe band. As the bandleader explained of his program, “I'm hoping to make a significant contribution to both the university and the North American piping scene.” And what a scene it is.",
    courseSchedule:
      'Schedule: \n M, W, F \n 2:00am - 3:00am \n T, Th \n 9:30am - 11:00am',
    id: 19
  },
  {
    courseName: 'Race Track Industry',
    size: 75,
    courseIntro:
      "The next time somebody tells you that you spend too much time at the track, tell them that it was your college major. If you're telling the truth, good for you! You are one of the rare specialists in the art and science of competitive equestrian facility maintenance.",
    courseMoreInformation:
      "If you're lying, then we're concerned you might have a gambling problem. Assuming the former, there's a good chance you studied at the University of Arizona. Indeed, the Tucson campus is home to one of the oldest and largest Race Track Industry degree programs in circulation. In fact, the program was initially chartered in response to a rising need within the industry for college educated professionals. The increasingly complex and sophisticated business of horse racing prompted several industry leaders to partner with the University in 1973 to create what is now a thriving bachelor's degree program. Falling under the umbrella of the Department of Agriculture, this major gives students a choice between either the Business or Animal Management aspects of a career in horse racing. The former is for those who will manage, market, or regulate horse racing operations and the latter is for those who will seek an occupation in training, breeding, or farm management. Far from being an obscure major, this one is actually a pretty safe bet for undergraduates. According to the University of Arizona, roughly 80% of degree-holders from this program find employment immediately upon graduation.",
    courseSchedule:
      'Schedule: \n M, W, F \n 3:00am - 4:00am \n T, Th \n 10:30am - 12:00pm',
    id: 20
  },
  {
    courseName: 'Theme Park Engineering',
    size: 80,
    courseIntro:
      'For a guy working at a sandwich shop, a bad day is when you accidentally run out of mayonnaise before the lunch rush. A bad day for a guy who designs amusement park rides is when the ferris wheel come loose from its bearings and rolls through downtown rush hour traffic.',
    courseMoreInformation:
      "Point is, if you're going to design roller coasters and log flumes, it's a great idea to know exactly what you're doing. And that's not just because this is serious life and death stuff. It's also because nobody likes a boring ride. There's a fine line between feeling like you might die and actually running the risk. Theme Park Engineering majors are those special individuals who know the exact mathematical equation for riding that line. At California State University in Long Beach, you can become one of these individuals by successfully earning your Bachelor of Science in Engineering with an Option in Theme Park Engineering. First entering the course catalog in 1999, Theme Park Engineering requires foci in electrical, civil, and mechanical engineering as well as hydraulic and pneumatic control. These are pretty much all the things you'll need to know if you ever wish to design a Gravitron, repair a Tilt-a-Whirl, or reduce the vomit-factor of a Teacups ride gone haywire.",
    courseSchedule:
      'Schedule: \n M, W, F \n 4:00am - 5:00am \n T, Th \n 11:30am - 1:00pm',
    id: 21
  }
]

// the users table contains both students and teachers
const user = [
  {
    firstName: 'Khuong',
    lastName: 'Le',
    email: 'student1@email.com',
    password: '123',
    accountType: 'student'
  },
  {
    firstName: 'Jonathan',
    lastName: 'Arreola',
    email: 'student2@email.com',
    password: '123',
    accountType: 'student'
  },
  {
    firstName: 'Dean',
    lastName: 'Gladish',
    email: 'student3@email.com',
    password: '123',
    accountType: 'student'
  },
  {
    firstName: 'Zach',
    lastName: 'Bryce',
    email: 'student4@email.com',
    password: '123',
    accountType: 'student'
  },
  {
    firstName: 'Fifth',
    lastName: 'Student',
    email: 'laststudent@email.com',
    password: '123',
    accountType: 'student'
  },
  {
    firstName: 'Student',
    lastName: 'A',
    email: 'studentAllClasses@email.com',
    password: '123',
    accountType: 'student'
  },
  {
    firstName: 'Travis',
    lastName: 'Stratton',
    email: 'teacher1@email.com',
    password: '123',
    accountType: 'teacher'
  },
  {
    firstName: 'Jonah',
    lastName: 'Ullman',
    email: 'teacher2@email.com',
    password: '123',
    accountType: 'teacher'
  },
  {
    firstName: 'No',
    lastName: 'Classes',
    email: 'teachesNoClasses@email.com',
    password: '123',
    accountType: 'teacher'
  },
  {
    firstName: 'Big',
    lastName: 'Brother',
    email: 'admin@email.com',
    password: '123',
    accountType: 'admin'
  }
]

const assignment = [
  {
    assignmentName: 'Capstone',
    assignmentType: 'project',
    dueDate: new Date('September 9, 2020 11:30:00'),
    courseId: 3,
    totalPoints: 30,
    weight: 20,
    description: 'The hardest project of Fullstack Academy. Best of luck.'
  },
  {
    assignmentName: 'Senior Assessment',
    assignmentType: 'test',
    dueDate: new Date('July 20, 2020 12:00:00'),
    courseId: 3,
    totalPoints: 20,
    weight: 15,
    description: 'Best of luck getting ot the other side'
  },
  {
    assignmentName: 'REACTO',
    assignmentType: 'classwork',
    dueDate: new Date('July 19, 2020 08:30:00'),
    courseId: 4,
    totalPoints: 60,
    weight: 1,
    description: 'This are practice algorithm for interviews'
  },
  {
    assignmentName: 'Wonderwall',
    assignmentType: 'homework',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 2,
    totalPoints: 10,
    weight: 3,
    description: 'Best song to start learning the guitar'
  },
  {
    assignmentName: 'Name that Chord',
    assignmentType: 'quiz',
    dueDate: new Date('August 21, 2020 19:15:00'),
    courseId: 2,
    totalPoints: 95,
    weight: 10,
    description: 'You need to learn the fundamentals'
  },
  {
    assignmentName: 'First test assignment for Econ 201',
    assignmentType: 'classwork',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 1,
    totalPoints: 100,
    weight: 1,
    description: 'Gotta learn some Econ terms'
  },
  {
    assignmentName: 'Second test assignment for Econ 201',
    assignmentType: 'homework',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 1,
    totalPoints: 15,
    weight: 3,
    description: 'Got to learn some more Econ terms'
  },
  {
    assignmentName: 'First test assignment for Guitar 101',
    assignmentType: 'classwork',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 2,
    totalPoints: 75,
    weight: 1,
    description: 'Can you play wonderwall?'
  },
  {
    assignmentName: 'Second test assignment for Guitar 101',
    assignmentType: 'homework',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 2,
    totalPoints: 60,
    weight: 3,
    description: 'Can you play wonderwall well?'
  },
  {
    assignmentName: 'First test assignment for REACTO 202',
    assignmentType: 'classwork',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 4,
    totalPoints: 40,
    weight: 1,
    description: 'What do you know about BST'
  },
  {
    assignmentName: 'Second test assignment for REACTO 202',
    assignmentType: 'homework',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 4,
    totalPoints: 10,
    weight: 3,
    description: 'What do you know about Linked Lists'
  },
  {
    assignmentName: 'First test assignment for Senior Coding 404',
    assignmentType: 'classwork',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 3,
    totalPoints: 85,
    weight: 1,
    description: 'Async week time'
  },
  {
    assignmentName: 'Second test assignment for Senior Coding 404',
    assignmentType: 'homework',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 3,
    totalPoints: 35,
    weight: 3,
    description: 'Time to do some grace shopper'
  }
]

const classroom = {
  className: 'Lecture Hall 01',
  classSize: 5
}

const enrollment = [
  {
    classGrade: 100,
    completionStatus: true,
    courseId: 4,
    userId: 5
  },
  {
    classGrade: 89,
    completionStatus: false,
    courseId: 1,
    userId: 1
  },
  {
    classGrade: 45,
    completionStatus: false,
    courseId: 2,
    userId: 1
  },
  {
    classGrade: 75,
    completionStatus: false,
    courseId: 3,
    userId: 1
  },
  {
    classGrade: 99,
    completionStatus: false,
    courseId: 2,
    userId: 2
  },
  {
    classGrade: 98,
    completionStatus: true,
    courseId: 3,
    userId: 2
  },
  {
    classGrade: 88,
    completionStatus: false,
    courseId: 2,
    userId: 3
  },
  {
    classGrade: 91,
    completionStatus: false,
    courseId: 3,
    userId: 3
  },
  {
    classGrade: 87,
    completionStatus: false,
    courseId: 2,
    userId: 4
  },
  {
    classGrade: 85,
    completionStatus: true,
    courseId: 3,
    userId: 4
  },
  {
    classGrade: 95,
    completionStatus: true,
    courseId: 1,
    userId: 6
  },
  {
    classGrade: 94,
    completionStatus: true,
    courseId: 2,
    userId: 6
  },
  {
    classGrade: 93,
    completionStatus: true,
    courseId: 3,
    userId: 6
  },
  {
    classGrade: 92,
    completionStatus: true,
    courseId: 4,
    userId: 6
  },
  // {
  //   classGrade: 10,
  //   completionStatus: true,
  //   courseId: 5,
  //   userId: 6
  // },
  // {
  //   classGrade: 20,
  //   completionStatus: false,
  //   courseId: 5,
  //   userId: 1
  // },
  {
    classGrade: 30,
    completionStatus: true,
    courseId: 6,
    userId: 2
  },
  {
    classGrade: 35,
    completionStatus: true,
    courseId: 6,
    userId: 6
  },
  {
    classGrade: 40,
    completionStatus: false,
    courseId: 6,
    userId: 3
  },
  {
    classGrade: 45,
    completionStatus: true,
    courseId: 6,
    userId: 4
  },
  {
    classGrade: 50,
    completionStatus: true,
    courseId: 7,
    userId: 6
  },
  {
    classGrade: 55,
    completionStatus: false,
    courseId: 7,
    userId: 3
  },
  {
    classGrade: 60,
    completionStatus: true,
    courseId: 7,
    userId: 4
  },
  {
    classGrade: 65,
    completionStatus: true,
    courseId: 8,
    userId: 6
  },
  {
    classGrade: 70,
    completionStatus: false,
    courseId: 8,
    userId: 4
  },
  {
    classGrade: 75,
    completionStatus: true,
    courseId: 8,
    userId: 5
  },
  // {
  //   classGrade: 80,
  //   completionStatus: true,
  //   courseId: 9,
  //   userId: 6
  // },
  // {
  //   classGrade: 85,
  //   completionStatus: false,
  //   courseId: 9,
  //   userId: 1
  // },
  // {
  //   classGrade: 90,
  //   completionStatus: true,
  //   courseId: 9,
  //   userId: 2
  // },
  {
    classGrade: 95,
    completionStatus: true,
    courseId: 10,
    userId: 6
  },
  {
    classGrade: 100,
    completionStatus: false,
    courseId: 10,
    userId: 2
  },
  {
    classGrade: 50,
    completionStatus: true,
    courseId: 10,
    userId: 3
  },
  {
    classGrade: 60,
    completionStatus: true,
    courseId: 11,
    userId: 6
  },
  {
    classGrade: 70,
    completionStatus: false,
    courseId: 11,
    userId: 3
  },
  {
    classGrade: 80,
    completionStatus: true,
    courseId: 11,
    userId: 4
  },
  {
    classGrade: 90,
    completionStatus: true,
    courseId: 12,
    userId: 6
  },
  {
    classGrade: 50,
    completionStatus: false,
    courseId: 12,
    userId: 4
  },
  {
    classGrade: 60,
    completionStatus: true,
    courseId: 12,
    userId: 5
  },
  {
    classGrade: 70,
    completionStatus: true,
    courseId: 13,
    userId: 6
  },
  {
    classGrade: 80,
    completionStatus: false,
    courseId: 13,
    userId: 5
  },
  {
    classGrade: 90,
    completionStatus: true,
    courseId: 13,
    userId: 1
  },
  {
    classGrade: 10,
    completionStatus: true,
    courseId: 14,
    userId: 6
  },
  {
    classGrade: 20,
    completionStatus: false,
    courseId: 14,
    userId: 1
  },
  {
    classGrade: 30,
    completionStatus: true,
    courseId: 14,
    userId: 2
  },
  {
    classGrade: 40,
    completionStatus: true,
    courseId: 15,
    userId: 6
  },
  {
    classGrade: 50,
    completionStatus: false,
    courseId: 15,
    userId: 2
  },
  {
    classGrade: 60,
    completionStatus: true,
    courseId: 15,
    userId: 3
  },
  {
    classGrade: 70,
    completionStatus: true,
    courseId: 16,
    userId: 6
  },
  {
    classGrade: 80,
    completionStatus: false,
    courseId: 16,
    userId: 3
  },
  {
    classGrade: 90,
    completionStatus: true,
    courseId: 16,
    userId: 4
  },
  {
    classGrade: 80,
    completionStatus: true,
    courseId: 17,
    userId: 6
  },
  {
    classGrade: 70,
    completionStatus: false,
    courseId: 17,
    userId: 4
  },
  {
    classGrade: 60,
    completionStatus: true,
    courseId: 17,
    userId: 5
  },
  {
    classGrade: 50,
    completionStatus: true,
    courseId: 18,
    userId: 6
  },
  {
    classGrade: 40,
    completionStatus: false,
    courseId: 18,
    userId: 5
  },
  {
    classGrade: 30,
    completionStatus: true,
    courseId: 18,
    userId: 1
  },
  {
    classGrade: 20,
    completionStatus: true,
    courseId: 19,
    userId: 6
  },
  {
    classGrade: 10,
    completionStatus: false,
    courseId: 19,
    userId: 1
  },
  {
    classGrade: 0,
    completionStatus: false,
    courseId: 19,
    userId: 2
  },
  {
    classGrade: 10,
    completionStatus: true,
    courseId: 20,
    userId: 6
  },
  {
    classGrade: 20,
    completionStatus: false,
    courseId: 20,
    userId: 2
  },
  {
    classGrade: 30,
    completionStatus: true,
    courseId: 20,
    userId: 3
  },
  {
    classGrade: 40,
    completionStatus: true,
    courseId: 21,
    userId: 6
  },
  {
    classGrade: 50,
    completionStatus: false,
    courseId: 21,
    userId: 3
  },
  {
    classGrade: 60,
    completionStatus: true,
    courseId: 21,
    userId: 4
  }

  //24 is the max course id
]

const gradebook = [
  {
    assignmentId: 1,
    userId: 1
  },
  {
    status: 'completed',
    individualGrade: 70,
    assignmentId: 2,
    userId: 1
  },
  {
    status: 'completed',
    individualGrade: 36,
    assignmentId: 3,
    userId: 1
  },
  {
    status: 'completed',
    individualGrade: 56,
    assignmentId: 4,
    userId: 1
  },
  {
    status: 'completed',
    individualGrade: 99,
    assignmentId: 5,
    userId: 1
  },
  {
    assignmentId: 1,
    userId: 2
  },
  {
    assignmentId: 1,
    userId: 3
  },
  {
    assignmentId: 1,
    userId: 4
  },
  {
    status: 'completed',
    individualGrade: 99,
    assignmentId: 2,
    userId: 2
  },
  {
    status: 'late',
    individualGrade: 98,
    assignmentId: 2,
    userId: 3
  },
  {
    status: 'excused',
    individualGrade: 97,
    assignmentId: 2,
    userId: 4
  },
  {
    status: 'completed',
    individualGrade: 89,
    assignmentId: 3,
    userId: 2
  },
  {
    status: 'completed',
    individualGrade: 88,
    assignmentId: 3,
    userId: 3
  },
  {
    status: 'completed',
    individualGrade: 87,
    assignmentId: 3,
    userId: 4
  },
  {
    status: 'completed',
    individualGrade: 99,
    assignmentId: 1,
    userId: 6
  },
  {
    status: 'completed',
    individualGrade: 97,
    assignmentId: 2,
    userId: 6
  },
  {
    status: 'completed',
    individualGrade: 93,
    assignmentId: 3,
    userId: 6
  },
  {
    assignmentId: 4,
    userId: 6
  },
  {
    assignmentId: 5,
    userId: 6
  }
]

module.exports = {course, user, assignment, enrollment, gradebook, classroom}

// Course.hasMany(Assignment)
// Assignment.belongsTo(Course)

// Course.belongsToMany(User, {through: Enrollment})
// User.belongsToMany(Course, {through: Enrollment})

// Assignment.belongsToMany(User, {through: Gradebook})
// User.belongsToMany(Assignment, {through: Gradebook})
