## The epic

Design a service that given a string with line breaks ("\n") and formatting parameters, returns a string formatted with basic markdown syntax.

Example input:

```
Bees – including honey bees, bumble bees and solitary bees – are very important because they pollinate food crops.\nPollination is where insects move pollen from one plant to another, fertilising the plants so that they can produce fruit, vegetables, seeds and so on. If all the bees went extinct, it would destroy the delicate balance of the Earth’s ecosystem and affect global food supplies.\nThere are more than 800 wild bee species within Europe, seven of which are classified by the International Union for Conservation of Nature (IUCN) as critically endangered.
```

The service should be able to:

-   Limit text to a specified line width.
-   Align text to left, right and center within the specified line width.
-   Set single or double line spacing.
-   Given a list of words, turn them bold using markdown syntax. (ie. all **Bees** words in text should be made bold)
-   Given a list of words, turn them italic using markdown syntax. (ie. all _extinct_ words in text should be made italic)
-   Given a list of words and their substitutions, replace all occurrences of the specified words with their substitutions. (ie. replace every Bees with BEES and so on)
-   Given a list of words, add a random Chuck Norris animal fact after the paragraph where such words are found. (possible source https://api.chucknorris.io/)

Further requirements would be added in the next sprint.

### A test case

Given the parameters:

```
- Line width: 80
- Text alignment: right
- Spacing: single
- Bold strings: "Bees", "Earth", "species"
- Italic strings: "extinct"
- Replace strings: ("Europe", "Asia"), ("seeds", "flowers")
- Chuck Norris animal fact strings: "wild", "fruit"
```
