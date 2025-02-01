# movie-watchlist
This is a **Scrimba project** from the Frontend Developer Career Path, to practice workign with APIs. The app allows users to create a dynamic movie watchlist by fetching movie data from the [OMDb API](https://www.omdbapi.com/), based on user input.

In addition to the project requirements I added:
- support for black and white mode
- improved UX experience, by saving last search in session storage and updating components on user interactions
- saved watchlist and preferred color scheme in local storage
- moved API Key into [config.json](./config.json) and used async/await for fetching movie data efficiently,

## Setup & Usage
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/movie-watchlist.git
   cd movie-watchlist
   ```

2. **Get your OMDb API Key**:
   - Visit [OMDb API](https://www.omdbapi.com/apikey.aspx) and sign up for a free API key.

3. **Configure the API Key**:
   - Replace `"YOUR_API_KEY"` in the [config.json](./config.json) file with your own API key:
     ```json
     {
       "omdbApiKey": "YOUR_API_KEY"
     }
     ```
4. **Run the project**:
   - Open `index.html` in your preferred browser or use a live server extension in your code editor.

## 🚀 Preview

[![Live Preview](https://github.com/user-attachments/assets/10f0b259-a259-46c5-98ce-6f619adf39fd)](https://your-live-preview-link.com)

**[Click here to view the live app!](https://your-live-preview-link.com)**

## Check out Scrimba

Their goal is to create the best possible coding school at the cost of a gym membership! 💜
The Frontend Developer Career Path aims to teach you everything you need to become a Junior Developer, or you could take a deep-dive with one of their advanced courses 🚀

- [courses](https://scrimba.com/allcourses)
- [The Frontend Career Path](https://scrimba.com/learn/frontend)
- [Become a Scrimba Pro member](https://scrimba.com/pricing)
