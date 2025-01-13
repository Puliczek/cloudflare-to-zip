<div align="center">
  <p>
    🤝 Show your support - give a ⭐️ if you liked the content
  </p>
  <p>
    <a target="_blank" href='https://dub.sh/cloudflare-to-zip'><img src="https://img.shields.io/twitter/follow/pulik_io" alt="X (formerly Twitter) Follow" width="180" height="30"/></a>
  </p>
</div>

---

# cloudflare-to-zip

A lightweight and efficient Cloudflare Worker service that creates ZIP archives from base64-encoded files on the fly. Built with Hono and designed for high performance and ease of use.

## Features

- 📦 Create ZIP archives from multiple files
- 🚀 Fast and efficient processing using Cloudflare Workers
- 💾 Handles base64-encoded file data
- 📅 Automatically generates timestamped ZIP filenames
- 🔒 Built with TypeScript for type safety
- ⚡ Powered by [Hono](https://hono.dev/) framework
- 🗜️ Uses [littlezipper](https://www.npmjs.com/package/littlezipper) for ZIP creation

## Limitations

⚠️ Current testing has been performed with:
- Maximum of 10 images simultaneously
- Each file up to 200KB in size
- Larger files or higher volumes need additional testing

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Puliczek/cloudflare-to-zip.git
cd cloudflare-to-zip
```

2. Install dependencies:
```bash
npm install
```

## Development

To run the project locally:

```bash
npm run dev
```

This will start the development server using Wrangler.

## Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

## API Documentation

### POST /zip

Creates a ZIP archive from the provided files.

#### Request Body

```json
[
    {
        "name": "test1.txt",
        "base64": "data:text/plain;base64,SGVsbG8gV29ybGQh"
    },
    {
        "name": "test2.txt",
        "base64": "data:text/plain;base64,VGhpcyBpcyBhIHRlc3QgZmlsZQ=="
    }
]
```

#### Response

- **Success**: Returns a ZIP file with `application/zip` content type
- **Error**: Returns JSON with error details
  - 400: No files provided
  - 500: Processing error

#### Example Usage

```typescript
const response = await fetch('https://your-worker.workers.dev/zip', {
  method: 'POST',
  body: JSON.stringify([
    {
      name: 'example.txt',
      base64: 'data:text/plain;base64,SGVsbG8gV29ybGQh'
    }
  ])
});

if (response.ok) {
  const blob = await response.blob();
  // Handle the ZIP file
}
```

## Technologies

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Hono](https://hono.dev/) - Fast, Lightweight, Web-standards Web Framework
- [TypeScript](https://www.typescriptlang.org/)
- [littlezipper](https://www.npmjs.com/package/littlezipper)

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
