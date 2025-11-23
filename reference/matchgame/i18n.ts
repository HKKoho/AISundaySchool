import { Round } from './types';

interface Translations {
  [key: string]: {
    title: string;
    round: string;
    score: string;
    submit: string;
    nextRound: string;
    finishGame: string;
    gameOver: string;
    finalScore: string;
    playAgain: string;
    correctMessage: string;
    incorrectMessage: string;
    selectAllMessage: string;
    footerText: string;
    select: string;
    generateNewRound: string;
    generating: string;
    generatingExplanation: string;
    aiError: string;
    gameRounds: Round[];
  };
}

export const translations: Translations = {
  en: {
    title: "Bible Scholar Match Game",
    round: "Round",
    score: "Score",
    submit: "Submit Answers",
    nextRound: "Next Round",
    finishGame: "Finish Game",
    gameOver: "Game Over",
    finalScore: "Your final score is:",
    playAgain: "Play Again",
    correctMessage: "Correct! Well done!",
    incorrectMessage: "Not quite. All four must be correct to score.",
    selectAllMessage: "Please match all four items before submitting.",
    footerText: "Test your biblical knowledge. A perfect score requires all four matches in a round to be correct.",
    select: "Select",
    generateNewRound: "Generate New Round with AI",
    generating: "Generating...",
    generatingExplanation: "Generating explanation...",
    aiError: "Sorry, there was an error contacting the AI. Please try again.",
    gameRounds: [
      {
        id: 1,
        category: "Patriarchs and Their Journeys",
        leftSide: [
          { id: 'A', text: "Abraham" },
          { id: 'B', text: "Isaac" },
          { id: 'C', text: "Jacob" },
          { id: 'D', text: "Joseph" },
        ],
        rightSide: [
          { id: 'r1', text: "Deceived his father with goatskins to receive a blessing.", correctMatch: 'C' },
          { id: 'r2', text: "Called by God from Ur of the Chaldeans to a promised land.", correctMatch: 'A' },
          { id: 'r3', text: "Interpreted dreams and rose to second-in-command of Egypt.", correctMatch: 'D' },
          { id: 'r4', text: "The long-awaited son of promise, almost sacrificed on Mount Moriah.", correctMatch: 'B' },
        ],
      },
      {
        id: 2,
        category: "Theology of Pauline Epistles",
        leftSide: [
          { id: 'A', text: "Romans" },
          { id: 'B', text: "1 Corinthians" },
          { id: 'C', text: "Galatians" },
          { id: 'D', text: "Ephesians" },
        ],
        rightSide: [
          { id: 'r1', text: "Justification by faith alone, contrasting with the works of the Law.", correctMatch: 'C' },
          { id: 'r2', text: "A comprehensive explanation of the doctrine of salvation and righteousness.", correctMatch: 'A' },
          { id: 'r3', text: "The church as the body of Christ, united in the Spirit.", correctMatch: 'D' },
          { id: 'r4', text: "Addresses divisions, immorality, and questions about spiritual gifts in a church.", correctMatch: 'B' },
        ],
      },
      {
        id: 3,
        category: "Gospels and Their Audience",
        leftSide: [
            { id: 'A', text: "Matthew" },
            { id: 'B', text: "Mark" },
            { id: 'C', text: "Luke" },
            { id: 'D', text: "John" },
        ],
        rightSide: [
            { id: 'r1', text: "Written for a Roman audience, emphasizing Jesus as the suffering servant and man of action.", correctMatch: 'B' },
            { id: 'r2', text: "Presents Jesus as the divine Son of God, using 'I AM' statements and focusing on eternal life.", correctMatch: 'D' },
            { id: 'r3', text: "Written for a Jewish audience, presenting Jesus as the fulfillment of Old Testament prophecy and the promised King.", correctMatch: 'A' },
            { id: 'r4', text: "Addressed to Theophilus for a Gentile audience, emphasizing Jesus's concern for the poor, marginalized, and women.", correctMatch: 'C' },
        ],
      },
      {
        id: 4,
        category: "Kings of the United Monarchy",
        leftSide: [
            { id: 'A', text: "Saul" },
            { id: 'B', text: "David" },
            { id: 'C', text: "Solomon" },
            { id: 'D', text: "Rehoboam" },
        ],
        rightSide: [
            { id: 'r1', text: "A man after God's own heart who established Jerusalem as the capital.", correctMatch: 'B' },
            { id: 'r2', text: "Asked God for wisdom and built the first Temple.", correctMatch: 'C' },
            { id: 'r3', text: "The first king of Israel, whose reign ended in tragedy due to disobedience.", correctMatch: 'A' },
            { id: 'r4', text: "His harsh policies led to the division of the kingdom into Israel and Judah.", correctMatch: 'D' },
        ],
      },
      {
        id: 5,
        category: "Major Prophets and Their Message",
        leftSide: [
          { id: 'A', text: "Isaiah" },
          { id: 'B', text: "Jeremiah" },
          { id: 'C', text: "Ezekiel" },
          { id: 'D', text: "Daniel" },
        ],
        rightSide: [
          { id: 'r1', text: "Prophesied judgment through a coming Babylonian exile, known as the 'weeping prophet'.", correctMatch: 'B' },
          { id: 'r2', text: "His book is filled with prophecies of the coming Messiah and the 'Suffering Servant'.", correctMatch: 'A' },
          { id: 'r3', text: "Served in the Babylonian court and interpreted dreams, foretelling future world empires.", correctMatch: 'D' },
          { id: 'r4', text: "Used dramatic visions like the 'valley of dry bones' to promise restoration to the exiles in Babylon.", correctMatch: 'C' },
        ],
      },
        {
        id: 6,
        category: "Books of the Pentateuch",
        leftSide: [
            { id: 'A', text: "Genesis" },
            { id: 'B', text: "Exodus" },
            { id: 'C', text: "Leviticus" },
            { id: 'D', text: "Deuteronomy" },
        ],
        rightSide: [
            { id: 'r1', text: "Details the sacrificial system, priesthood, and laws of holiness.", correctMatch: 'C' },
            { id: 'r2', text: "The book of beginnings: creation, the fall, the flood, and the patriarchs.", correctMatch: 'A' },
            { id: 'r3', text: "Moses' final sermons to Israel before they enter the promised land, restating the law.", correctMatch: 'D' },
            { id: 'r4', text: "The story of Israel's deliverance from slavery in Egypt and the giving of the Law at Sinai.", correctMatch: 'B' },
        ],
      },
      {
        id: 7,
        category: "Women of Faith",
        leftSide: [
            { id: 'A', text: "Ruth" },
            { id: 'B', text: "Esther" },
            { id: 'C', text: "Mary (Mother of Jesus)" },
            { id: 'D', text: "Hannah" },
        ],
        rightSide: [
            { id: 'r1', text: "A barren woman who prayed fervently for a son, whom she dedicated to God's service.", correctMatch: 'D' },
            { id: 'r2', text: "A Moabite woman who showed exemplary loyalty to her mother-in-law and became an ancestor of David.", correctMatch: 'A' },
            { id: 'r3', text: "A Jewish queen in Persia who risked her life to save her people from genocide.", correctMatch: 'B' },
            { id: 'r4', text: "A young virgin who humbly accepted God's call to bear the Messiah.", correctMatch: 'C' },
        ],
      },
      {
        id: 8,
        category: "Parables and Their Meanings",
        leftSide: [
            { id: 'A', text: "The Good Samaritan" },
            { id: 'B', text: "The Prodigal Son" },
            { id: 'C', text: "The Sower" },
            { id: 'D', text: "The Talents" },
        ],
        rightSide: [
            { id: 'r1', text: "Illustrates God's extravagant love and forgiveness for the repentant sinner.", correctMatch: 'B' },
            { id: 'r2', text: "Teaches about responsible stewardship of the gifts God has given.", correctMatch: 'D' },
            { id: 'r3', text: "Explains that a 'neighbor' is anyone in need, regardless of background.", correctMatch: 'A' },
            { id: 'r4', text: "Shows how people respond differently to the message of God's Kingdom.", correctMatch: 'C' },
        ],
      },
      {
        id: 9,
        category: "The 'I AM' Sayings in John",
        leftSide: [
            { id: 'A', text: "The Bread of Life" },
            { id: 'B', text: "The Light of the World" },
            { id: 'C', text: "The Good Shepherd" },
            { id: 'D', text: "The Resurrection and the Life" },
        ],
        rightSide: [
            { id: 'r1', text: "Jesus offers spiritual guidance and protection, even laying down his life for his sheep.", correctMatch: 'C' },
            { id: 'r2', text: "Jesus provides the ultimate spiritual nourishment that leads to eternal life.", correctMatch: 'A' },
            { id: 'r3', text: "Jesus is the only hope for eternal life, conquering even death itself.", correctMatch: 'D' },
            { id: 'r4', text: "Jesus reveals the truth of God and offers a way out of spiritual darkness.", correctMatch: 'B' },
        ],
      },
      {
        id: 10,
        category: "Crucial Biblical Backgrounds",
        leftSide: [
            { id: 'A', text: "Hellenism" },
            { id: 'B', text: "Roman Empire" },
            { id: 'C', text: "Babylonian Exile" },
            { id: 'D', text: "Second Temple Period" },
        ],
        rightSide: [
            { id: 'r1', text: "The political context of the New Testament, providing peace (Pax Romana) and roads for the spread of the gospel.", correctMatch: 'B' },
            { id: 'r2', text: "A pivotal event that led to the destruction of the first temple and the rise of synagogue worship.", correctMatch: 'C' },
            { id: 'r3', text: "The spread of Greek language and culture, which profoundly influenced the context of the New Testament.", correctMatch: 'A' },
            { id: 'r4', text: "The time between the return from exile and the destruction of the temple in 70 AD, in which Judaism significantly developed.", correctMatch: 'D' },
        ],
      },
      {
        id: 11,
        category: "General Epistles and Themes",
        leftSide: [
          { id: 'A', text: "Hebrews" },
          { id: 'B', text: "James" },
          { id: 'C', text: "1 Peter" },
          { id: 'D', text: "Jude" },
        ],
        rightSide: [
          { id: 'r1', text: "Exhorts believers to live as 'foreigners and exiles' and to endure suffering with hope.", correctMatch: 'C' },
          { id: 'r2', text: "Emphasizes that true faith is demonstrated by good works.", correctMatch: 'B' },
          { id: 'r3', text: "Urges believers to contend for the faith against false teachers who have crept into the church.", correctMatch: 'D' },
          { id: 'r4', text: "Argues for the superiority of Christ over the Old Covenant angels, priests, and sacrifices.", correctMatch: 'A' },
        ],
      },
      {
        id: 12,
        category: "Types of Psalms",
        leftSide: [
          { id: 'A', text: "Lament" },
          { id: 'B', text: "Praise" },
          { id: 'C', text: "Thanksgiving" },
          { id: 'D', text: "Wisdom" },
        ],
        rightSide: [
          { id: 'r1', text: "Expresses gratitude for a specific act of deliverance or blessing from God.", correctMatch: 'C' },
          { id: 'r2', text: "A cry to God in times of distress, trouble, or despair.", correctMatch: 'A' },
          { id: 'r3', text: "Offers general instruction on godly living, contrasting the way of the righteous and the wicked.", correctMatch: 'D' },
          { id: 'r4', text: "Celebrates the character and attributes of God.", correctMatch: 'B' },
        ],
      },
        {
        id: 13,
        category: "Events in the Life of Jesus",
        leftSide: [
          { id: 'A', text: "The Baptism" },
          { id: 'B', text: "The Transfiguration" },
          { id: 'C', text: "The Triumphal Entry" },
          { id: 'D', text: "The Ascension" },
        ],
        rightSide: [
          { id: 'r1', text: "Jesus's ride into Jerusalem on a donkey, fulfilling prophecy and being hailed as king.", correctMatch: 'C' },
          { id: 'r2', text: "A moment on a mountain where Jesus's divine glory was revealed to Peter, James, and John.", correctMatch: 'B' },
          { id: 'r3', text: "The start of Jesus's public ministry, where the Father's voice was heard, 'This is my beloved Son.'", correctMatch: 'A' },
          { id: 'r4', text: "Jesus's final departure from earth into heaven, commissioning his disciples.", correctMatch: 'D' },
        ],
      },
      {
        id: 14,
        category: "Figures in the Early Church",
        leftSide: [
          { id: 'A', text: "Stephen" },
          { id: 'B', text: "Philip the Evangelist" },
          { id: 'C', text: "Barnabas" },
          { id: 'D', text: "Timothy" },
        ],
        rightSide: [
          { id: 'r1', text: "Known as the 'Son of Encouragement,' he mentored Paul and accompanied him on his first missionary journey.", correctMatch: 'C' },
          { id: 'r2', text: "The first Christian martyr, stoned to death after a powerful speech to the Sanhedrin.", correctMatch: 'A' },
          { id: 'r3', text: "Paul's young protégé and trusted companion in ministry, to whom two epistles are addressed.", correctMatch: 'D' },
          { id: 'r4', text: "One of the first deacons, he preached in Samaria and explained the gospel to an Ethiopian eunuch.", correctMatch: 'B' },
        ],
      },
      {
        id: 15,
        category: "Theology of Revelation",
        leftSide: [
          { id: 'A', text: "The Lamb" },
          { id: 'B', text: "Babylon the Great" },
          { id: 'C', text: "The New Jerusalem" },
          { id: 'D', text: "The Seven Seals" },
        ],
        rightSide: [
          { id: 'r1', text: "A series of judgments unleashed upon the earth as a scroll is opened.", correctMatch: 'D' },
          { id: 'r2', text: "Symbolizes the ultimate destiny of the redeemed, a place of perfect communion with God.", correctMatch: 'C' },
          { id: 'r3', text: "Represents the central figure of the book, who is worthy to open the scroll because he was slain.", correctMatch: 'A' },
          { id: 'r4', text: "A symbolic name for a worldly system of idolatry, immorality, and opposition to God.", correctMatch: 'B' },
        ],
      },
      {
        id: 16,
        category: "Old Testament Covenants",
        leftSide: [
          { id: 'A', text: "Noahic Covenant" },
          { id: 'B', text: "Abrahamic Covenant" },
          { id: 'C', text: "Mosaic Covenant" },
          { id: 'D', text: "Davidic Covenant" },
        ],
        rightSide: [
          { id: 'r1', text: "The conditional covenant given at Mount Sinai, centered on the Law.", correctMatch: 'C' },
          { id: 'r2', text: "The promise of land, descendants, and blessing to all nations.", correctMatch: 'B' },
          { id: 'r3', text: "The promise of an eternal dynasty and kingdom for a king.", correctMatch: 'D' },
          { id: 'r4', text: "God's promise to never again destroy all life on earth with a flood, signified by a rainbow.", correctMatch: 'A' },
        ],
      },
      {
        id: 17,
        category: "Biblical Genres",
        leftSide: [
          { id: 'A', text: "Law" },
          { id: 'B', text: "History" },
          { id: 'C', text: "Wisdom Literature" },
          { id: 'D', text: "Apocalyptic Literature" },
        ],
        rightSide: [
          { id: 'r1', text: "Books like Joshua and 1 & 2 Kings that narrate the story of Israel.", correctMatch: 'B' },
          { id: 'r2', text: "Books like Proverbs and Job that explore questions of godly living and suffering.", correctMatch: 'C' },
          { id: 'r3', text: "The first five books of the Old Testament, also known as the Torah or Pentateuch.", correctMatch: 'A' },
          { id: 'r4', text: "Books like Daniel and Revelation that use symbolic language to reveal God's ultimate victory.", correctMatch: 'D' },
        ],
      },
      {
        id: 18,
        category: "Authority of Scripture",
        leftSide: [
          { id: 'A', text: "Inspiration" },
          { id: 'B', text: "Inerrancy" },
          { id: 'C', text: "Canon" },
          { id: 'D', text: "Illumination" },
        ],
        rightSide: [
          { id: 'r1', text: "The work of the Holy Spirit enabling believers to understand and apply Scripture.", correctMatch: 'D' },
          { id: 'r2', text: "The belief that the Bible, in its original manuscripts, is completely true and without error.", correctMatch: 'B' },
          { id: 'r3', text: "The process by which the books of the Bible were recognized as authoritative and divinely inspired.", correctMatch: 'C' },
          { id: 'r4', text: "The doctrine that God 'breathed out' the Scriptures through human authors.", correctMatch: 'A' },
        ],
      },
      {
        id: 19,
        category: "Minor Prophets",
        leftSide: [
          { id: 'A', text: "Hosea" },
          { id: 'B', text: "Jonah" },
          { id: 'C', text: "Amos" },
          { id: 'D', text: "Malachi" },
        ],
        rightSide: [
          { id: 'r1', text: "A reluctant prophet called to preach repentance to the enemy city of Nineveh.", correctMatch: 'B' },
          { id: 'r2', text: "A prophet of social justice who condemned the oppression of the poor.", correctMatch: 'C' },
          { id: 'r3', text: "His marriage to an unfaithful woman was a living parable of God's relationship with unfaithful Israel.", correctMatch: 'A' },
          { id: 'r4', text: "The last book of the Old Testament, which calls the people to return to God and anticipates the coming of Elijah.", correctMatch: 'D' },
        ],
      },
      {
        id: 20,
        category: "Early Church Heresies",
        leftSide: [
          { id: 'A', text: "Gnosticism" },
          { id: 'B', text: "Arianism" },
          { id: 'C', text: "Pelagianism" },
          { id: 'D', text: "Marcionism" },
        ],
        rightSide: [
          { id: 'r1', text: "Rejected the Old Testament God and claimed the God of Jesus was a different, higher deity.", correctMatch: 'D' },
          { id: 'r2', text: "Denied original sin and taught that humans could achieve salvation through their own free will and good works.", correctMatch: 'C' },
          { id: 'r3', text: "Claimed that salvation was achieved through secret knowledge and that the material world was evil.", correctMatch: 'A' },
          { id: 'r4', text: "Taught that Jesus was a created being, not co-eternal with God the Father.", correctMatch: 'B' },
        ],
      },
      {
        id: 21,
        category: "Judges of Israel",
        leftSide: [
          { id: 'A', text: "Gideon" },
          { id: 'B', text: "Samson" },
          { id: 'C', text: "Deborah" },
          { id: 'D', text: "Ehud" },
        ],
        rightSide: [
          { id: 'r1', text: "Defeated the Midianites with an army of 300 men.", correctMatch: 'A' },
          { id: 'r2', text: "Fought the Philistines, known for his incredible strength tied to his hair.", correctMatch: 'B' },
          { id: 'r3', text: "The only female judge, who led Israel to victory from under a palm tree.", correctMatch: 'C' },
          { id: 'r4', text: "A left-handed man who defeated the Moabite king Eglon with a concealed dagger.", correctMatch: 'D' },
        ],
      },
      {
        id: 22,
        category: "The Twelve Apostles",
        leftSide: [
          { id: 'A', text: "Peter" },
          { id: 'B', text: "Andrew" },
          { id: 'C', text: "Thomas" },
          { id: 'D', text: "Matthew" },
        ],
        rightSide: [
          { id: 'r1', text: "Known for initially doubting the resurrection until he saw Jesus's wounds.", correctMatch: 'C' },
          { id: 'r2', text: "The first disciple called, who then brought his brother Simon to Jesus.", correctMatch: 'B' },
          { id: 'r3', text: "A tax collector who left his post to follow Jesus.", correctMatch: 'D' },
          { id: 'r4', text: "Confessed Jesus as the Christ and was called 'the rock'.", correctMatch: 'A' },
        ],
      },
      {
        id: 23,
        category: "Miracles of Jesus",
        leftSide: [
          { id: 'A', text: "Turning water into wine" },
          { id: 'B', text: "Healing the paralytic" },
          { id: 'C', text: "Feeding the 5,000" },
          { id: 'D', text: "Raising Lazarus" },
        ],
        rightSide: [
          { id: 'r1', text: "Demonstrated power over nature by multiplying a few loaves and fish.", correctMatch: 'C' },
          { id: 'r2', text: "Showed his power over death by bringing his friend back to life after four days.", correctMatch: 'D' },
          { id: 'r3', text: "His first recorded miracle, performed at a wedding in Cana.", correctMatch: 'A' },
          { id: 'r4', text: "Showed his authority to forgive sins by telling a man to 'take up your mat and walk'.", correctMatch: 'B' },
        ],
      },
      {
        id: 24,
        category: "The Plagues of Egypt",
        leftSide: [
          { id: 'A', text: "Plague of Blood" },
          { id: 'B', text: "Plague of Frogs" },
          { id: 'C', text: "Plague of Darkness" },
          { id: 'D', text: "Plague of the Firstborn" },
        ],
        rightSide: [
          { id: 'r1', text: "The final, devastating plague that led Pharaoh to release the Israelites.", correctMatch: 'D' },
          { id: 'r2', text: "A supernatural darkness that covered the land of Egypt for three days.", correctMatch: 'C' },
          { id: 'r3', text: "The first plague, where the Nile River was turned into blood.", correctMatch: 'A' },
          { id: 'r4', text: "Amphibians swarmed the land, even entering the houses of the Egyptians.", correctMatch: 'B' },
        ],
      },
      {
        id: 25,
        category: "Fruit of the Spirit (Galatians 5)",
        leftSide: [
          { id: 'A', text: "Love, Joy, Peace" },
          { id: 'B', text: "Patience, Kindness, Goodness" },
          { id: 'C', text: "Faithfulness, Gentleness" },
          { id: 'D', text: "Self-Control" },
        ],
        rightSide: [
          { id: 'r1', text: "The outward-focused virtues of forbearance and benevolent action.", correctMatch: 'B' },
          { id: 'r2', text: "The upward-focused virtues reflecting one's relationship with God.", correctMatch: 'A' },
          { id: 'r3', text: "The inward-focused virtue of mastering one's desires and passions.", correctMatch: 'D' },
          { id: 'r4', text: "Relational virtues demonstrating reliability and a mild disposition.", correctMatch: 'C' },
        ],
      },
      {
        id: 26,
        category: "Armor of God (Ephesians 6)",
        leftSide: [
          { id: 'A', text: "Belt of Truth" },
          { id: 'B', text: "Breastplate of Righteousness" },
          { id: 'C', text: "Shield of Faith" },
          { id: 'D', text: "Sword of the Spirit" },
        ],
        rightSide: [
          { id: 'r1', text: "Protects the heart from sin and accusation.", correctMatch: 'B' },
          { id: 'r2', text: "The only offensive weapon, which is the Word of God.", correctMatch: 'D' },
          { id: 'r3', text: "Holds everything together, representing integrity and sincerity.", correctMatch: 'A' },
          { id: 'r4', text: "Extinguishes the flaming arrows of the evil one.", correctMatch: 'C' },
        ],
      },
      {
        id: 27,
        category: "The Beatitudes (Matthew 5)",
        leftSide: [
          { id: 'A', text: "Blessed are the poor in spirit" },
          { id: 'B', text: "Blessed are those who mourn" },
          { id: 'C', text: "Blessed are the merciful" },
          { id: 'D', text: "Blessed are the pure in heart" },
        ],
        rightSide: [
          { id: 'r1', text: "...for they will be shown mercy.", correctMatch: 'C' },
          { id: 'r2', text: "...for they will see God.", correctMatch: 'D' },
          { id: 'r3', text: "...for theirs is the kingdom of heaven.", correctMatch: 'A' },
          { id: 'r4', text: "...for they will be comforted.", correctMatch: 'B' },
        ],
      },
      {
        id: 28,
        category: "Locations in the Holy Land",
        leftSide: [
          { id: 'A', text: "Jerusalem" },
          { id: 'B', text: "Bethlehem" },
          { id: 'C', text: "Nazareth" },
          { id: 'D', text: "Sea of Galilee" },
        ],
        rightSide: [
          { id: 'r1', text: "The town where Jesus grew up during his childhood.", correctMatch: 'C' },
          { id: 'r2', text: "The birthplace of Jesus and King David.", correctMatch: 'B' },
          { id: 'r3', text: "The location of much of Jesus's public ministry, including calming the storm.", correctMatch: 'D' },
          { id: 'r4', text: "The holy city, site of the Temple, and where Jesus was crucified.", correctMatch: 'A' },
        ],
      },
      {
        id: 29,
        category: "Famous Last Words",
        leftSide: [
          { id: 'A', text: "Jesus" },
          { id: 'B', text: "Stephen" },
          { id: 'C', text: "Moses" },
          { id: 'D', text: "Paul" },
        ],
        rightSide: [
          { id: 'r1', text: "'I have fought the good fight, I have finished the race, I have kept the faith.'", correctMatch: 'D' },
          { id: 'r2', text: "'Lord, do not hold this sin against them.'", correctMatch: 'B' },
          { id: 'r3', text: "'It is finished.'", correctMatch: 'A' },
          { id: 'r4', text: "'The LORD your God is God... he will not leave you or forsake you.'", correctMatch: 'C' },
        ],
      },
      {
        id: 30,
        category: "Poetic Books and Their Focus",
        leftSide: [
          { id: 'A', text: "Job" },
          { id: 'B', text: "Psalms" },
          { id: 'C', text: "Proverbs" },
          { id: 'D', text: "Song of Solomon" },
        ],
        rightSide: [
          { id: 'r1', text: "A collection of wise sayings and practical advice for daily living.", correctMatch: 'C' },
          { id: 'r2', text: "Explores the problem of suffering and God's sovereignty.", correctMatch: 'A' },
          { id: 'r3', text: "A collection of poems and songs for worship, praise, and lament.", correctMatch: 'B' },
          { id: 'r4', text: "A love poem celebrating the beauty of marital love.", correctMatch: 'D' },
        ],
      },
      {
        id: 31,
        category: "Post-Exilic Leaders",
        leftSide: [
          { id: 'A', text: "Ezra" },
          { id: 'B', text: "Nehemiah" },
          { id: 'C', text: "Zerubbabel" },
          { id: 'D', text: "Haggai" },
        ],
        rightSide: [
          { id: 'r1', text: "The governor who led the effort to rebuild the walls of Jerusalem.", correctMatch: 'B' },
          { id: 'r2', text: "A priest and scribe who taught the Law of Moses to the returned exiles.", correctMatch: 'A' },
          { id: 'r3', text: "A prophet who encouraged the people to finish rebuilding the Temple.", correctMatch: 'D' },
          { id: 'r4', text: "A descendant of David who led the first wave of exiles back and began rebuilding the Temple.", correctMatch: 'C' },
        ],
      },
      {
        id: 32,
        category: "Key Doctrines of Faith",
        leftSide: [
          { id: 'A', text: "Trinity" },
          { id: 'B', text: "Incarnation" },
          { id: 'C', text: "Atonement" },
          { id: 'D', text: "Resurrection" },
        ],
        rightSide: [
          { id: 'r1', text: "The doctrine that Jesus's death made amends for sin and reconciled humanity to God.", correctMatch: 'C' },
          { id: 'r2', text: "The doctrine that God is one being in three co-equal persons: Father, Son, and Holy Spirit.", correctMatch: 'A' },
          { id: 'r3', text: "The cornerstone of Christian hope, the physical rising of Jesus from the dead.", correctMatch: 'D' },
          { id: 'r4', text: "The doctrine that the eternal Son of God took on human flesh in the person of Jesus Christ.", correctMatch: 'B' },
        ],
      },
      {
        id: 33,
        category: "Symbols in the Bible",
        leftSide: [
          { id: 'A', text: "Dove" },
          { id: 'B', text: "Rainbow" },
          { id: 'C', text: "Lion of Judah" },
          { id: 'D', text: "Cross" },
        ],
        rightSide: [
          { id: 'r1', text: "A symbol of God's covenant with Noah, promising never to flood the earth again.", correctMatch: 'B' },
          { id: 'r2', text: "A symbol of the Holy Spirit, seen at Jesus's baptism.", correctMatch: 'A' },
          { id: 'r3', text: "The primary symbol of Christian faith, representing Jesus's sacrifice.", correctMatch: 'D' },
          { id: 'r4', text: "A title for Jesus that signifies his royal lineage and authority.", correctMatch: 'C' },
        ],
      },
      {
        id: 34,
        category: "Mountains in the Bible",
        leftSide: [
          { id: 'A', text: "Mount Sinai" },
          { id: 'B', text: "Mount Carmel" },
          { id: 'C', text: "Mount Zion" },
          { id: 'D', text: "Mount of Olives" },
        ],
        rightSide: [
          { id: 'r1', text: "The site of Elijah's contest with the prophets of Baal.", correctMatch: 'B' },
          { id: 'r2', text: "The location where Moses received the Ten Commandments from God.", correctMatch: 'A' },
          { id: 'r3', text: "Located east of Jerusalem, where Jesus prayed before his crucifixion and from where he ascended.", correctMatch: 'D' },
          { id: 'r4', text: "Often used as a name for Jerusalem and the dwelling place of God.", correctMatch: 'C' },
        ],
      },
      {
        id: 35,
        category: "Rivers and Seas in the Bible",
        leftSide: [
          { id: 'A', text: "Jordan River" },
          { id: 'B', text: "Red Sea" },
          { id: 'C', text: "Tigris River" },
          { id: 'D', text: "Dead Sea" },
        ],
        rightSide: [
          { id: 'r1', text: "The body of water parted by God to allow the Israelites to escape from Egypt.", correctMatch: 'B' },
          { id: 'r2', text: "The site of Jesus's baptism by John and Israel's crossing into the Promised Land.", correctMatch: 'A' },
          { id: 'r3', text: "A large, extremely salty lake, near the ancient cities of Sodom and Gomorrah.", correctMatch: 'D' },
          { id: 'r4', text: "One of the two rivers that bordered the Garden of Eden.", correctMatch: 'C' },
        ],
      },
      {
        id: 36,
        category: "Feasts of Israel",
        leftSide: [
          { id: 'A', text: "Passover" },
          { id: 'B', text: "Pentecost" },
          { id: 'C', text: "Day of Atonement" },
          { id: 'D', text: "Feast of Tabernacles" },
        ],
        rightSide: [
          { id: 'r1', text: "Also known as Yom Kippur, the day the high priest made sacrifice for the sins of the nation.", correctMatch: 'C' },
          { id: 'r2', text: "Commemorates the giving of the Law at Sinai and the coming of the Holy Spirit.", correctMatch: 'B' },
          { id: 'r3', text: "Remembers the Israelites' 40 years of wandering in the desert by living in temporary shelters.", correctMatch: 'D' },
          { id: 'r4', text: "Celebrates God's deliverance of Israel from slavery in Egypt.", correctMatch: 'A' },
        ],
      },
      {
        id: 37,
        category: "Significant Numbers in the Bible",
        leftSide: [
          { id: 'A', text: "7" },
          { id: 'B', text: "12" },
          { id: 'C', text: "40" },
          { id: 'D', text: "3" },
        ],
        rightSide: [
          { id: 'r1', text: "Often represents a period of testing or trial (e.g., days in the wilderness).", correctMatch: 'C' },
          { id: 'r2', text: "Often represents divine perfection or completeness (e.g., days of creation).", correctMatch: 'A' },
          { id: 'r3', text: "Often represents resurrection or divine wholeness (e.g., persons of the Godhead).", correctMatch: 'D' },
          { id: 'r4', text: "Often represents God's people or governmental perfection (e.g., tribes of Israel).", correctMatch: 'B' },
        ],
      },
      {
        id: 38,
        category: "Enemies of Israel",
        leftSide: [
          { id: 'A', text: "Philistines" },
          { id: 'B', text: "Amalekites" },
          { id: 'C', text: "Assyrians" },
          { id: 'D', text: "Babylonians" },
        ],
        rightSide: [
          { id: 'r1', text: "The empire that conquered the Southern Kingdom of Judah and destroyed Solomon's Temple.", correctMatch: 'D' },
          { id: 'r2', text: "A persistent coastal enemy, famously represented by the giant Goliath.", correctMatch: 'A' },
          { id: 'r3', text: "The empire that conquered the Northern Kingdom of Israel and scattered its people.", correctMatch: 'C' },
          { id: 'r4', text: "An ancient enemy who attacked Israel in the wilderness; God commanded Saul to utterly destroy them.", correctMatch: 'B' },
        ],
      },
      {
        id: 39,
        category: "The Ten Commandments",
        leftSide: [
          { id: 'A', text: "1st Commandment" },
          { id: 'B', text: "4th Commandment" },
          { id: 'C', text: "5th Commandment" },
          { id: 'D', text: "10th Commandment" },
        ],
        rightSide: [
          { id: 'r1', text: "Honor your father and your mother.", correctMatch: 'C' },
          { id: 'r2', text: "Remember the Sabbath day by keeping it holy.", correctMatch: 'B' },
          { id: 'r3', text: "You shall not covet.", correctMatch: 'D' },
          { id: 'r4', text: "You shall have no other gods before me.", correctMatch: 'A' },
        ],
      },
      {
        id: 40,
        category: "Siblings in the Bible",
        leftSide: [
          { id: 'A', text: "Cain and Abel" },
          { id: 'B', text: "Mary, Martha, and Lazarus" },
          { id: 'C', text: "Leah and Rachel" },
          { id: 'D', text: "James and John" },
        ],
        rightSide: [
          { id: 'r1', text: "Sisters who were both married to Jacob and became mothers of the tribes of Israel.", correctMatch: 'C' },
          { id: 'r2', text: "Apostles known as the 'Sons of Thunder' who were part of Jesus's inner circle.", correctMatch: 'D' },
          { id: 'r3', text: "The story of the first murder, stemming from jealousy over a sacrifice.", correctMatch: 'A' },
          { id: 'r4', text: "Close friends of Jesus who lived in Bethany.", correctMatch: 'B' },
        ],
      }
    ],
  },
  'zh-TW': {
    title: "聖經學者配對遊戲",
    round: "回合",
    score: "分數",
    submit: "提交答案",
    nextRound: "下一回合",
    finishGame: "完成遊戲",
    gameOver: "遊戲結束",
    finalScore: "你的最終分數是：",
    playAgain: "再玩一次",
    correctMessage: "正確！做得好！",
    incorrectMessage: "不完全正確。必須四項全部配對正確才能得分。",
    selectAllMessage: "提交前請配對所有四個項目。",
    footerText: "測試您的聖經知識。要獲得滿分，每回合的四個配對都必須正確。",
    select: "選擇",
    generateNewRound: "使用 AI 生成新回合",
    generating: "生成中...",
    generatingExplanation: "正在生成解釋...",
    aiError: "抱歉，聯繫 AI 時發生錯誤。請再試一次。",
    gameRounds: [
      {
        id: 1,
        category: "族長們和他們的旅程",
        leftSide: [
          { id: 'A', text: "亞伯拉罕" },
          { id: 'B', text: "以撒" },
          { id: 'C', text: "雅各" },
          { id: 'D', text: "約瑟" },
        ],
        rightSide: [
          { id: 'r1', text: "用山羊皮欺騙父親以獲得祝福。", correctMatch: 'C' },
          { id: 'r2', text: "被上帝從迦勒底的吾珥呼召到應許之地。", correctMatch: 'A' },
          { id: 'r3', text: "解夢並晉升為埃及的宰相。", correctMatch: 'D' },
          { id: 'r4', text: "期待已久的應許之子，險些在摩利亞山上被獻為祭。", correctMatch: 'B' },
        ],
      },
      {
        id: 2,
        category: "保羅書信的神學",
        leftSide: [
          { id: 'A', text: "羅馬書" },
          { id: 'B', text: "哥林多前書" },
          { id: 'C', text: "加拉太書" },
          { id: 'D', text: "以弗所書" },
        ],
        rightSide: [
          { id: 'r1', text: "唯獨因信稱義，與律法的行為相對。", correctMatch: 'C' },
          { id: 'r2', text: "對救恩和公義教義的全面解釋。", correctMatch: 'A' },
          { id: 'r3', text: "教會是基督的身體，在聖靈裡合一。", correctMatch: 'D' },
          { id: 'r4', text: "處理教會中的分裂、不道德和關於屬靈恩賜的問題。", correctMatch: 'B' },
        ],
      },
      {
        id: 3,
        category: "福音書及其讀者",
        leftSide: [
            { id: 'A', text: "馬太福音" },
            { id: 'B', text: "馬可福音" },
            { id: 'C', text: "路加福音" },
            { id: 'D', text: "約翰福音" },
        ],
        rightSide: [
            { id: 'r1', text: "為羅馬讀者而寫，強調耶穌是受苦的僕人和行動者。", correctMatch: 'B' },
            { id: 'r2', text: "呈現耶穌為神聖的上帝之子，使用「我是」的宣告並專注於永生。", correctMatch: 'D' },
            { id: 'r3', text: "為猶太讀者而寫，呈現耶穌為舊約預言的應驗和應許的君王。", correctMatch: 'A' },
            { id: 'r4', text: "寫給提阿非羅，為外邦讀者而寫，強調耶穌對窮人、邊緣人和婦女的關懷。", correctMatch: 'C' },
        ],
      },
      {
        id: 4,
        category: "統一王國時期的君王",
        leftSide: [
            { id: 'A', text: "掃羅" },
            { id: 'B', text: "大衛" },
            { id: 'C', text: "所羅門" },
            { id: 'D', text: "羅波安" },
        ],
        rightSide: [
            { id: 'r1', text: "一位合神心意的人，他建立了耶路撒冷為首都。", correctMatch: 'B' },
            { id: 'r2', text: "向神求智慧並建造了第一座聖殿。", correctMatch: 'C' },
            { id: 'r3', text: "以色列的第一位國王，因不順服而以悲劇告終。", correctMatch: 'A' },
            { id: 'r4', text: "他嚴厲的政策導致王國分裂為以色列和猶大。", correctMatch: 'D' },
        ],
      },
      {
        id: 5,
        category: "主要先知及其信息",
        leftSide: [
          { id: 'A', text: "以賽亞" },
          { id: 'B', text: "耶利米" },
          { id: 'C', text: "以西結" },
          { id: 'D', text: "但以理" },
        ],
        rightSide: [
          { id: 'r1', text: "預言了因巴比倫流亡而來的審判，被稱為「流淚的先知」。", correctMatch: 'B' },
          { id: 'r2', text: "他的書充滿了關於即將到來的彌賽亞和「受苦僕人」的預言。", correctMatch: 'A' },
          { id: 'r3', text: "在巴比倫宮廷中服事並解夢，預言了未來的世界帝國。", correctMatch: 'D' },
          { id: 'r4', text: "使用如「枯骨谷」等戲劇性異象，向在巴比倫的流亡者承諾復興。", correctMatch: 'C' },
        ],
      },
      {
        id: 6,
        category: "摩西五經",
        leftSide: [
            { id: 'A', text: "創世記" },
            { id: 'B', text: "出埃及記" },
            { id: 'C', text: "利未記" },
            { id: 'D', text: "申命記" },
        ],
        rightSide: [
            { id: 'r1', text: "詳細描述了獻祭制度、祭司職任和聖潔的律法。", correctMatch: 'C' },
            { id: 'r2', text: "萬物起源之書：創造、墮落、洪水和眾族長。", correctMatch: 'A' },
            { id: 'r3', text: "摩西在以色列人進入應許之地前的最後講道，重申律法。", correctMatch: 'D' },
            { id: 'r4', text: "以色列人從埃及為奴之地得釋放，以及在西奈山頒布律法的故事。", correctMatch: 'B' },
        ],
      },
      {
        id: 7,
        category: "信心的婦女",
        leftSide: [
            { id: 'A', text: "路得" },
            { id: 'B', text: "以斯帖" },
            { id: 'C', text: "馬利亞（耶穌的母親）" },
            { id: 'D', text: "哈拿" },
        ],
        rightSide: [
            { id: 'r1', text: "一位不育的婦女，她懇切地祈求一個兒子，並將他奉獻給神。", correctMatch: 'D' },
            { id: 'r2', text: "一位摩押女子，對婆婆表現出模範的忠誠，並成為大衛的祖先。", correctMatch: 'A' },
            { id: 'r3', text: "波斯的一位猶太王后，她冒著生命危險從種族滅絕中拯救了她的同胞。", correctMatch: 'B' },
            { id: 'r4', text: "一位年輕的處女，謙卑地接受了上帝的呼召，懷了彌賽亞。", correctMatch: 'C' },
        ],
      },
      {
        id: 8,
        category: "比喻及其意義",
        leftSide: [
            { id: 'A', text: "好撒馬利亞人" },
            { id: 'B', text: "浪子" },
            { id: 'C', text: "撒種者" },
            { id: 'D', text: "才幹" },
        ],
        rightSide: [
            { id: 'r1', text: "闡釋了上帝對悔改罪人的豐盛慈愛與饒恕。", correctMatch: 'B' },
            { id: 'r2', text: "教導我們要負責任地管理上帝所賜的恩賜。", correctMatch: 'D' },
            { id: 'r3', text: "解釋了「鄰舍」是任何有需要的人，不論其背景如何。", correctMatch: 'A' },
            { id: 'r4', text: "顯示了人們對上帝國度信息有何不同的反應。", correctMatch: 'C' },
        ],
      },
      {
        id: 9,
        category: "約翰福音中的「我是」宣告",
        leftSide: [
            { id: 'A', text: "生命的糧" },
            { id: 'B', text: "世界的光" },
            { id: 'C', text: "好牧人" },
            { id: 'D', text: "復活和生命" },
        ],
        rightSide: [
            { id: 'r1', text: "耶穌提供屬靈的引導和保護，甚至為他的羊捨命。", correctMatch: 'C' },
            { id: 'r2', text: "耶穌提供引向永生的終極屬靈滋養。", correctMatch: 'A' },
            { id: 'r3', text: "耶穌是永生的唯一希望，甚至戰勝了死亡本身。", correctMatch: 'D' },
            { id: 'r4', text: "耶穌揭示了上帝的真理，並提供了擺脫屬靈黑暗的道路。", correctMatch: 'B' },
        ],
      },
      {
        id: 10,
        category: "關鍵的聖經背景",
        leftSide: [
            { id: 'A', text: "希臘化" },
            { id: 'B', text: "羅馬帝國" },
            { id: 'C', text: "巴比倫流亡" },
            { id: 'D', text: "第二聖殿時期" },
        ],
        rightSide: [
            { id: 'r1', text: "新約的政治背景，提供了和平（羅馬和平）和道路，促進了福音的傳播。", correctMatch: 'B' },
            { id: 'r2', text: "導致第一聖殿被毀和猶太會堂敬拜興起的關鍵事件。", correctMatch: 'C' },
            { id: 'r3', text: "希臘語言和文化的傳播，深刻影響了新約的背景。", correctMatch: 'A' },
            { id: 'r4', text: "從流亡歸來到公元70年聖殿被毀之間的時期，猶太教在此期間有顯著發展。", correctMatch: 'D' },
        ],
      },
      {
        id: 11,
        category: "普通書信與主題",
        leftSide: [
          { id: 'A', text: "希伯來書" },
          { id: 'B', text: "雅各書" },
          { id: 'C', text: "彼得前書" },
          { id: 'D', text: "猶大書" },
        ],
        rightSide: [
          { id: 'r1', text: "勸勉信徒要像「客旅和寄居的」那樣生活，並帶著盼望忍受苦難。", correctMatch: 'C' },
          { id: 'r2', text: "強調真正的信心是通過好行為來證明的。", correctMatch: 'B' },
          { id: 'r3', text: "敦促信徒為信仰辯護，對抗那些潛入教會的假教師。", correctMatch: 'D' },
          { id: 'r4', text: "論證基督超越舊約的天使、祭司和獻祭。", correctMatch: 'A' },
        ],
      },
      {
        id: 12,
        category: "詩篇的類型",
        leftSide: [
          { id: 'A', text: "哀歌" },
          { id: 'B', text: "讚美詩" },
          { id: 'C', text: "感恩詩" },
          { id: 'D', text: "智慧詩" },
        ],
        rightSide: [
          { id: 'r1', text: "為上帝特定的拯救行為或祝福表達感激之情。", correctMatch: 'C' },
          { id: 'r2', text: "在困苦、麻煩或絕望時向上帝發出的呼求。", correctMatch: 'A' },
          { id: 'r3', text: "提供關於敬虔生活的一般性教導，對比義人與惡人的道路。", correctMatch: 'D' },
          { id: 'r4', text: "頌揚上帝的品格和屬性。", correctMatch: 'B' },
        ],
      },
      {
        id: 13,
        category: "耶穌生平中的事件",
        leftSide: [
          { id: 'A', text: "洗禮" },
          { id: 'B', text: "登山變像" },
          { id: 'C', text: "榮入聖城" },
          { id: 'D', text: "升天" },
        ],
        rightSide: [
          { id: 'r1', text: "耶穌騎驢進入耶路撒冷，應驗了預言，並被譽為君王。", correctMatch: 'C' },
          { id: 'r2', text: "在山上，耶穌的神聖榮耀向彼得、雅各和約翰顯現的時刻。", correctMatch: 'B' },
          { id: 'r3', text: "耶穌公開事奉的開始，天父的聲音說：「這是我的愛子」。", correctMatch: 'A' },
          { id: 'r4', text: "耶穌最後離開地上升入天堂，並差遣他的門徒。", correctMatch: 'D' },
        ],
      },
      {
        id: 14,
        category: "初期教會的人物",
        leftSide: [
          { id: 'A', text: "司提反" },
          { id: 'B', text: "傳福音的腓利" },
          { id: 'C', text: "巴拿巴" },
          { id: 'D', text: "提摩太" },
        ],
        rightSide: [
          { id: 'r1', text: "被稱為「勸慰子」，他指導保羅並陪同他進行第一次傳教之旅。", correctMatch: 'C' },
          { id: 'r2', text: "第一位基督教殉道者，在向公議會發表演說後被石頭打死。", correctMatch: 'A' },
          { id: 'r3', text: "保羅年輕的門徒和事工中信賴的夥伴，有兩封書信是寫給他的。", correctMatch: 'D' },
          { id: 'r4', text: "最早的執事之一，他在撒馬利亞傳道，並向一位埃塞俄比亞的太監解釋福音。", correctMatch: 'B' },
        ],
      },
      {
        id: 15,
        category: "啟示錄的神學",
        leftSide: [
          { id: 'A', text: "羔羊" },
          { id: 'B', text: "大巴比倫" },
          { id: 'C', text: "新耶路撒冷" },
          { id: 'D', text: "七印" },
        ],
        rightSide: [
          { id: 'r1', text: "隨著書卷被揭開，一系列降臨到地上的審判。", correctMatch: 'D' },
          { id: 'r2', text: "象徵得救贖者的最終歸宿，一個與上帝完美共融的地方。", correctMatch: 'C' },
          { id: 'r3', text: "代表書中的核心人物，因曾被殺而配揭開書卷。", correctMatch: 'A' },
          { id: 'r4', text: "一個象徵性的名字，代表一個充滿偶像崇拜、不道德和敵對上帝的世俗體系。", correctMatch: 'B' },
        ],
      },
      {
        id: 16,
        category: "舊約的聖約",
        leftSide: [
          { id: 'A', text: "挪亞之約" },
          { id: 'B', text: "亞伯拉罕之約" },
          { id: 'C', text: "摩西之約" },
          { id: 'D', text: "大衛之約" },
        ],
        rightSide: [
          { id: 'r1', text: "在西奈山所立的條件性聖約，以律法為中心。", correctMatch: 'C' },
          { id: 'r2', text: "對土地、後裔和萬國祝福的應許。", correctMatch: 'B' },
          { id: 'r3', text: "對一位君王永恆王朝和國度的應許。", correctMatch: 'D' },
          { id: 'r4', text: "上帝應許不再用洪水毀滅地上一切生命，以彩虹為記號。", correctMatch: 'A' },
        ],
      },
      {
        id: 17,
        category: "聖經文體",
        leftSide: [
          { id: 'A', text: "律法書" },
          { id: 'B', text: "歷史書" },
          { id: 'C', text: "智慧文學" },
          { id: 'D', text: "啟示文學" },
        ],
        rightSide: [
          { id: 'r1', text: "像約書亞記和列王紀上下這樣敘述以色列故事的書。", correctMatch: 'B' },
          { id: 'r2', text: "像箴言和約伯記這樣探討敬虔生活和苦難問題的書。", correctMatch: 'C' },
          { id: 'r3', text: "舊約的前五本書，也稱為摩西五經或妥拉。", correctMatch: 'A' },
          { id: 'r4', text: "像但以理書和啟示錄這樣使用象徵性語言來揭示上帝最終勝利的書。", correctMatch: 'D' },
        ],
      },
      {
        id: 18,
        category: "聖經的權威",
        leftSide: [
          { id: 'A', text: "默示" },
          { id: 'B', text: "無誤" },
          { id: 'C', text: "正典" },
          { id: 'D', text: "光照" },
        ],
        rightSide: [
          { id: 'r1', text: "聖靈的工作，使信徒能夠理解和應用聖經。", correctMatch: 'D' },
          { id: 'r2', text: "相信聖經在其原始手稿中是完全真實且沒有錯誤的。", correctMatch: 'B' },
          { id: 'r3', text: "聖經各書卷被確認為具有權威和神聖默示的過程。", correctMatch: 'C' },
          { id: 'r4', text: "上帝通過人類作者「呼出」聖經的教義。", correctMatch: 'A' },
        ],
      },
      {
        id: 19,
        category: "小先知書",
        leftSide: [
          { id: 'A', text: "何西阿書" },
          { id: 'B', text: "約拿書" },
          { id: 'C', text: "阿摩司書" },
          { id: 'D', text: "瑪拉基書" },
        ],
        rightSide: [
          { id: 'r1', text: "一位不情願的先知，被召喚到敵對城市尼尼微宣講悔改。", correctMatch: 'B' },
          { id: 'r2', text: "一位社會正義的先知，譴責對窮人的壓迫。", correctMatch: 'C' },
          { id: 'r3', text: "他與不忠妻子的婚姻是上帝與不忠以色列關係的活生生比喻。", correctMatch: 'A' },
          { id: 'r4', text: "舊約的最後一卷書，呼召人民歸向上帝，並預期以利亞的到來。", correctMatch: 'D' },
        ],
      },
      {
        id: 20,
        category: "早期教會的異端",
        leftSide: [
          { id: 'A', text: "諾斯底主義" },
          { id: 'B', text: "亞流主義" },
          { id: 'C', text: "伯拉糾主義" },
          { id: 'D', text: "馬吉安主義" },
        ],
        rightSide: [
          { id: 'r1', text: "拒絕舊約的上帝，並聲稱耶穌的上帝是一個不同且更高的神。", correctMatch: 'D' },
          { id: 'r2', text: "否認原罪，並教導人類可以通過自己的自由意志和善行來獲得救贖。", correctMatch: 'C' },
          { id: 'r3', text: "聲稱救贖是通過秘密知識獲得的，並且物質世界是邪惡的。", correctMatch: 'A' },
          { id: 'r4', text: "教導耶穌是一個被造物，與父神並非永恆共存。", correctMatch: 'B' },
        ],
      },
      {
        id: 21,
        category: "以色列的士師",
        leftSide: [
          { id: 'A', text: "基甸" },
          { id: 'B', text: "參孫" },
          { id: 'C', text: "底波拉" },
          { id: 'D', text: "以笏" },
        ],
        rightSide: [
          { id: 'r1', text: "用三百人擊敗了米甸人。", correctMatch: 'A' },
          { id: 'r2', text: "與非利士人作戰，以其與頭髮相關的超凡力量而聞名。", correctMatch: 'B' },
          { id: 'r3', text: "唯一的女士師，在棕樹下帶領以色列取得勝利。", correctMatch: 'C' },
          { id: 'r4', text: "一個左撇子，用暗藏的匕首擊敗了摩押王伊磯倫。", correctMatch: 'D' },
        ],
      },
      {
        id: 22,
        category: "十二使徒",
        leftSide: [
          { id: 'A', text: "彼得" },
          { id: 'B', text: "安得烈" },
          { id: 'C', text: "多馬" },
          { id: 'D', text: "馬太" },
        ],
        rightSide: [
          { id: 'r1', text: "因起初懷疑耶穌復活，直到看見耶穌的傷口而聞名。", correctMatch: 'C' },
          { id: 'r2', text: "第一個被呼召的門徒，他隨後帶他的兄弟西門去見耶穌。", correctMatch: 'B' },
          { id: 'r3', text: "一個稅吏，他離開職位跟隨了耶穌。", correctMatch: 'D' },
          { id: 'r4', text: "承認耶穌是基督，並被稱為「磐石」。", correctMatch: 'A' },
        ],
      },
      {
        id: 23,
        category: "耶穌所行的神蹟",
        leftSide: [
          { id: 'A', text: "變水為酒" },
          { id: 'B', text: "醫治癱子" },
          { id: 'C', text: "五餅二魚餵飽五千人" },
          { id: 'D', text: "使拉撒路復活" },
        ],
        rightSide: [
          { id: 'r1', text: "通過將幾個餅和幾條魚倍增，展示了對自然的權能。", correctMatch: 'C' },
          { id: 'r2', text: "在他的朋友死後四天將他復活，顯示了他戰勝死亡的權能。", correctMatch: 'D' },
          { id: 'r3', text: "他在迦拿的婚宴上行的第一個有記載的神蹟。", correctMatch: 'A' },
          { id: 'r4', text: "通過告訴一個人「拿起你的褥子走吧」，顯示了他赦罪的權柄。", correctMatch: 'B' },
        ],
      },
      {
        id: 24,
        category: "埃及十災",
        leftSide: [
          { id: 'A', text: "血災" },
          { id: 'B', text: "蛙災" },
          { id: 'C', text: "黑暗之災" },
          { id: 'D', text: "殺長子之災" },
        ],
        rightSide: [
          { id: 'r1', text: "最後一個毀滅性的災難，導致法老釋放以色列人。", correctMatch: 'D' },
          { id: 'r2', text: "籠罩埃及地三天的超自然黑暗。", correctMatch: 'C' },
          { id: 'r3', text: "第一個災難，尼羅河變成了血。", correctMatch: 'A' },
          { id: 'r4', text: "兩棲動物遍滿全地，甚至進入埃及人的房屋。", correctMatch: 'B' },
        ],
      },
      {
        id: 25,
        category: "聖靈的果子 (加拉太書 5章)",
        leftSide: [
          { id: 'A', text: "仁愛、喜樂、和平" },
          { id: 'B', text: "忍耐、恩慈、良善" },
          { id: 'C', text: "信實、溫柔" },
          { id: 'D', text: "節制" },
        ],
        rightSide: [
          { id: 'r1', text: "專注於外在的、寬容和仁慈行為的美德。", correctMatch: 'B' },
          { id: 'r2', text: "專注於向上的、反映個人與上帝關係的美德。", correctMatch: 'A' },
          { id: 'r3', text: "專注於內在的、駕馭個人慾望和激情的美德。", correctMatch: 'D' },
          { id: 'r4', text: "體現可靠性和溫和性情的關係美德。", correctMatch: 'C' },
        ],
      },
      {
        id: 26,
        category: "上帝所賜的全副軍裝 (以弗所書 6章)",
        leftSide: [
          { id: 'A', text: "真理的腰帶" },
          { id: 'B', text: "公義的護心鏡" },
          { id: 'C', text: "信德的藤牌" },
          { id: 'D', text: "聖靈的寶劍" },
        ],
        rightSide: [
          { id: 'r1', text: "保護心臟免受罪和控告。", correctMatch: 'B' },
          { id: 'r2', text: "唯一的進攻性武器，就是上帝的道。", correctMatch: 'D' },
          { id: 'r3', text: "將一切束在一起，代表正直和誠實。", correctMatch: 'A' },
          { id: 'r4', text: "可以滅盡那惡者一切的火箭。", correctMatch: 'C' },
        ],
      },
      {
        id: 27,
        category: "八福 (馬太福音 5章)",
        leftSide: [
          { id: 'A', text: "虛心的人有福了" },
          { id: 'B', text: "哀慟的人有福了" },
          { id: 'C', text: "憐恤人的人有福了" },
          { id: 'D', text: "清心的人有福了" },
        ],
        rightSide: [
          { id: 'r1', text: "…因為他們必蒙憐恤。", correctMatch: 'C' },
          { id: 'r2', text: "…因為他們必得見神。", correctMatch: 'D' },
          { id: 'r3', text: "…因為天國是他們的。", correctMatch: 'A' },
          { id: 'r4', text: "…因為他們必得安慰。", correctMatch: 'B' },
        ],
      },
      {
        id: 28,
        category: "聖地中的地點",
        leftSide: [
          { id: 'A', text: "耶路撒冷" },
          { id: 'B', text: "伯利恆" },
          { id: 'C', text: "拿撒勒" },
          { id: 'D', text: "加利利海" },
        ],
        rightSide: [
          { id: 'r1', text: "耶穌童年時期長大的城鎮。", correctMatch: 'C' },
          { id: 'r2', text: "耶穌和大衛王的出生地。", correctMatch: 'B' },
          { id: 'r3', text: "耶穌許多公開事奉的地點，包括平靜風浪。", correctMatch: 'D' },
          { id: 'r4', text: "聖城，聖殿的所在地，也是耶穌被釘十字架的地方。", correctMatch: 'A' },
        ],
      },
      {
        id: 29,
        category: "著名的遺言",
        leftSide: [
          { id: 'A', text: "耶穌" },
          { id: 'B', text: "司提反" },
          { id: 'C', text: "摩西" },
          { id: 'D', text: "保羅" },
        ],
        rightSide: [
          { id: 'r1', text: "「那美好的仗我已經打過了，當跑的路我已經跑盡了，所信的道我已經守住了。」", correctMatch: 'D' },
          { id: 'r2', text: "「主啊，不要將這罪歸於他們！」", correctMatch: 'B' },
          { id: 'r3', text: "「成了！」", correctMatch: 'A' },
          { id: 'r4', text: "「耶和華你的神是神…他必不撇下你，也不丟棄你。」", correctMatch: 'C' },
        ],
      },
      {
        id: 30,
        category: "詩歌智慧書及其焦點",
        leftSide: [
          { id: 'A', text: "約伯記" },
          { id: 'B', text: "詩篇" },
          { id: 'C', text: "箴言" },
          { id: 'D', text: "雅歌" },
        ],
        rightSide: [
          { id: 'r1', text: "智慧言論和日常生活實用建議的集合。", correctMatch: 'C' },
          { id: 'r2', text: "探討苦難問題和上帝的主權。", correctMatch: 'A' },
          { id: 'r3', text: "用於敬拜、讚美和哀悼的詩歌集。", correctMatch: 'B' },
          { id: 'r4', text: "一首慶祝婚姻愛情之美的愛情詩。", correctMatch: 'D' },
        ],
      },
      {
        id: 31,
        category: "被擄回歸時期的領袖",
        leftSide: [
          { id: 'A', text: "以斯拉" },
          { id: 'B', text: "尼希米" },
          { id: 'C', text: "所羅巴伯" },
          { id: 'D', text: "哈該" },
        ],
        rightSide: [
          { id: 'r1', text: "領導重建耶路撒冷城牆的省長。", correctMatch: 'B' },
          { id: 'r2', text: "向回歸的被擄者教導摩西律法的祭司和文士。", correctMatch: 'A' },
          { id: 'r3', text: "鼓勵百姓完成重建聖殿的先知。", correctMatch: 'D' },
          { id: 'r4', text: "大衛的後裔，他帶領第一批被擄者回歸並開始重建聖殿。", correctMatch: 'C' },
        ],
      },
      {
        id: 32,
        category: "信仰的關鍵教義",
        leftSide: [
          { id: 'A', text: "三位一體" },
          { id: 'B', text: "道成肉身" },
          { id: 'C', text: "贖罪" },
          { id: 'D', text: "復活" },
        ],
        rightSide: [
          { id: 'r1', text: "耶穌的死彌補了罪，使人類與上帝和好的教義。", correctMatch: 'C' },
          { id: 'r2', text: "上帝是三位一體，即聖父、聖子、聖靈，同等共存的教義。", correctMatch: 'A' },
          { id: 'r3', text: "基督教盼望的基石，耶穌身體從死裡復活。", correctMatch: 'D' },
          { id: 'r4', text: "永恆的上帝之子在耶穌基督裡取了人性的教義。", correctMatch: 'B' },
        ],
      },
      {
        id: 33,
        category: "聖經中的象徵",
        leftSide: [
          { id: 'A', text: "鴿子" },
          { id: 'B', text: "彩虹" },
          { id: 'C', text: "猶大的獅子" },
          { id: 'D', text: "十字架" },
        ],
        rightSide: [
          { id: 'r1', text: "上帝與挪亞立約的記號，應許不再用洪水毀滅世界。", correctMatch: 'B' },
          { id: 'r2', text: "聖靈的象徵，在耶穌受洗時出現。", correctMatch: 'A' },
          { id: 'r3', text: "基督教信仰的主要象徵，代表耶穌的犧牲。", correctMatch: 'D' },
          { id: 'r4', text: "耶穌的稱號，象徵他的王室血統和權柄。", correctMatch: 'C' },
        ],
      },
      {
        id: 34,
        category: "聖經中的山脈",
        leftSide: [
          { id: 'A', text: "西奈山" },
          { id: 'B', text: "迦密山" },
          { id: 'C', text: "錫安山" },
          { id: 'D', text: "橄欖山" },
        ],
        rightSide: [
          { id: 'r1', text: "以利亞與巴力先知鬥法的地點。", correctMatch: 'B' },
          { id: 'r2', text: "摩西從上帝那裡領受十誡的地點。", correctMatch: 'A' },
          { id: 'r3', text: "位於耶路撒冷以東，耶穌被釘十字架前在此禱告，並從此地升天。", correctMatch: 'D' },
          { id: 'r4', text: "常用作耶路撒冷和上帝居所的名稱。", correctMatch: 'C' },
        ],
      },
      {
        id: 35,
        category: "聖經中的河流與海洋",
        leftSide: [
          { id: 'A', text: "約旦河" },
          { id: 'B', text: "紅海" },
          { id: 'C', text: "底格里斯河" },
          { id: 'D', text: "死海" },
        ],
        rightSide: [
          { id: 'r1', text: "上帝分開此水域，讓以色列人逃離埃及。", correctMatch: 'B' },
          { id: 'r2', text: "耶穌受約翰施洗，以及以色列人進入應許之地的地點。", correctMatch: 'A' },
          { id: 'r3', text: "一個巨大且極鹹的湖泊，靠近古城所多瑪和蛾摩拉。", correctMatch: 'D' },
          { id: 'r4', text: "環繞伊甸園的兩條河流之一。", correctMatch: 'C' },
        ],
      },
      {
        id: 36,
        category: "以色列的節期",
        leftSide: [
          { id: 'A', text: "逾越節" },
          { id: 'B', text: "五旬節" },
          { id: 'C', text: "贖罪日" },
          { id: 'D', text: "住棚節" },
        ],
        rightSide: [
          { id: 'r1', text: "又稱Yom Kippur，大祭司為國民的罪獻祭的日子。", correctMatch: 'C' },
          { id: 'r2', text: "紀念在西奈山頒布律法和聖靈降臨。", correctMatch: 'B' },
          { id: 'r3', text: "通過住在臨時棚屋中，紀念以色列人在曠野漂流40年。", correctMatch: 'D' },
          { id: 'r4', text: "慶祝上帝從埃及為奴之地拯救以色列。", correctMatch: 'A' },
        ],
      },
      {
        id: 37,
        category: "聖經中的重要數字",
        leftSide: [
          { id: 'A', text: "7" },
          { id: 'B', text: "12" },
          { id: 'C', text: "40" },
          { id: 'D', text: "3" },
        ],
        rightSide: [
          { id: 'r1', text: "常代表一段考驗或試煉的時期（例如，在曠野的日子）。", correctMatch: 'C' },
          { id: 'r2', text: "常代表神的完美或完整（例如，創造的日子）。", correctMatch: 'A' },
          { id: 'r3', text: "常代表復活或神聖的完整性（例如，神格中的位格）。", correctMatch: 'D' },
          { id: 'r4', text: "常代表神的子民或治理的完美（例如，以色列的支派）。", correctMatch: 'B' },
        ],
      },
      {
        id: 38,
        category: "以色列的敵人",
        leftSide: [
          { id: 'A', text: "非利士人" },
          { id: 'B', text: "亞瑪力人" },
          { id: 'C', text: "亞述人" },
          { id: 'D', text: "巴比倫人" },
        ],
        rightSide: [
          { id: 'r1', text: "征服南國猶大並摧毀所羅門聖殿的帝國。", correctMatch: 'D' },
          { id: 'r2', text: "一個持續不斷的沿海敵人，以巨人歌利亞為著名代表。", correctMatch: 'A' },
          { id: 'r3', text: "征服北國以色列並使其人民四散的帝國。", correctMatch: 'C' },
          { id: 'r4', text: "一個在曠野攻擊以色列的古老敵人；上帝命令掃羅將他們完全毀滅。", correctMatch: 'B' },
        ],
      },
      {
        id: 39,
        category: "十誡",
        leftSide: [
          { id: 'A', text: "第一誡" },
          { id: 'B', text: "第四誡" },
          { id: 'C', text: "第五誡" },
          { id: 'D', text: "第十誡" },
        ],
        rightSide: [
          { id: 'r1', text: "當孝敬父母。", correctMatch: 'C' },
          { id: 'r2', text: "當記念安息日，守為聖日。", correctMatch: 'B' },
          { id: 'r3', text: "不可貪戀。", correctMatch: 'D' },
          { id: 'r4', text: "在我面前，你不可有別的神。", correctMatch: 'A' },
        ],
      },
      {
        id: 40,
        category: "聖經中的兄弟姐妹",
        leftSide: [
          { id: 'A', text: "該隱與亞伯" },
          { id: 'B', text: "馬利亞、馬大和拉撒路" },
          { id: 'C', text: "利亞與拉結" },
          { id: 'D', text: "雅各與約翰" },
        ],
// FIX: Added the missing rightSide property to this round object.
        rightSide: [
          { id: 'r1', text: "她們是雅各的妻子，也是以色列各支派的母親。", correctMatch: 'C' },
          { id: 'r2', text: "被稱為「雷子」的使徒，是耶穌核心圈子的一部分。", correctMatch: 'D' },
          { id: 'r3', text: "因嫉妒獻祭而引發的第一宗謀殺案。", correctMatch: 'A' },
          { id: 'r4', text: "住在伯大尼的耶穌的摯友。", correctMatch: 'B' },
        ],
      }
    ],
  },
};
