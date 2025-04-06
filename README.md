# Plant Scanner

A web application that allows users to identify plants through image recognition and learn about their care requirements.

## Features

- Upload plant images from your device
- Take photos using your device camera
- Automatic plant species identification using Plant.id API
- Get detailed information about identified plants:
  - Plant name and image
  - Water requirements
  - Benefits of the plant
  - Care instructions and growing tips

## API Setup

This application uses the [Plant.id API](https://plant.id/) for plant identification. To use the application with real plant identification:

1. Sign up for a Plant.id API key at [plant.id](https://web.plant.id/plant-identification-api/)
2. Copy your API key
3. Create a `.env` file in the root directory based on the `.env.example` file
4. Add your API key to the `.env` file:

```
VITE_PLANT_ID_API_KEY="your_actual_api_key_here"
```

**Note:** The free tier of Plant.id API has limitations on the number of requests. Check their pricing page for details.

### Demo Mode (No API Key)

If you don't have a Plant.id API key, the application will automatically fall back to using mock data for demonstration purposes. This allows you to test the UI and functionality without needing an actual API key.

To run in demo mode, either:
- Leave the placeholder value in the `.env` file
- Or don't create a `.env` file at all

In demo mode, all plants will be identified as "Monstera Deliciosa" with pre-set information.

## Demo

The current version uses simulated identification with mock data. In a production environment, it would integrate with a plant identification API service like:
- [Plant.id](https://plant.id/)
- [PlantNet](https://plantnet.org/) 
- [Google Vision API](https://cloud.google.com/vision)

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- Vite for fast development and building
- Plant.id API for plant identification (optional)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Plant.id API key (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/plant-scanner.git
cd plant-scanner
```

2. Install dependencies:
```bash
npm install
npm install @tailwindcss/postcss
```

3. Set up your API key as described in the API Setup section (optional)

4. Run the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173` or `http://localhost:5174`

## How It Works

The application flow is as follows:

1. Users upload a plant image or take a photo using their device camera
2. If a valid API key is provided:
   - The image is converted to base64 and sent to the Plant.id API
   - The API analyzes the image and returns plant identification data
   - The application processes this data to extract plant information
3. If no API key is provided or the API call fails:
   - The application falls back to using mock data for demonstration
4. The processed information is displayed in a user-friendly format

## Future Enhancements

- User accounts to save identified plants
- Plant care reminders and scheduling
- Social sharing functionality
- Expanded plant database with more detailed information
- Offline identification capabilities using TensorFlow.js

## License

MIT

## Acknowledgments

- Plant.id for the plant identification API
- Plant icons and SVGs from [Heroicons](https://heroicons.com/)
- Plant knowledge from various botanical resources
