import React, { useEffect, useState } from "react";
import { FastAverageColor } from 'fast-average-color';
import { Vibrant } from "node-vibrant/browser"

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [colors, setColors] = useState({});
  const [textColors, setTextColors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize color analyzer
  const fac = new FastAverageColor();

  // Fetch GitHub repositories
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.github.com/users/gowri-malla216/repos");
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Extract colors from images
  useEffect(() => {
    const extractColors = async (repo) => {
      try {
        const imageUrl = `https://raw.githubusercontent.com/gowri-malla216/${repo.name}/main/public/portfolio-cover.jpeg`;

        const palette = await Vibrant.from(imageUrl)
          .getPalette()

        if (palette && palette.Vibrant && palette.DarkVibrant && palette.LightVibrant && palette.Muted && palette.LightMuted && palette.DarkMuted) {
          setColors(prevColors => ({
            ...prevColors,
            [repo.id]: `linear-gradient(45deg, ${palette.LightVibrant.hex} , ${palette.LightMuted.hex})`,
          }));
          setTextColors(prevColors => ({
            ...prevColors,
            [repo.id]: `${palette.DarkMuted.hex}`,
          }));
        }
        else {
          const fallbackGradients = [
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #6B73FF, #000DFF)',
            'linear-gradient(135deg, #FC466B, #3F5EFB)',
            'linear-gradient(135deg, #fa709a, #fee140)',
            'linear-gradient(135deg, #4facfe, #00f2fe)',
          ];
          const index = repo.id % fallbackGradients.length;
          setColors(prevColors => ({
            ...prevColors,
            [repo.id]: fallbackGradients[index],
          }));
          setTextColors(prevColors => ({
            ...prevColors,
            [repo.id]: 'white',
          }));
        }

      } catch (error) {
        // Fallback gradients if color extraction fails
        const fallbackGradients = [
          'linear-gradient(135deg, #667eea, #764ba2)',
          'linear-gradient(135deg, #6B73FF, #000DFF)',
          'linear-gradient(135deg, #FC466B, #3F5EFB)',
          'linear-gradient(135deg, #fa709a, #fee140)',
          'linear-gradient(135deg, #4facfe, #00f2fe)',
        ];
        const index = repo.id % fallbackGradients.length;
        setColors(prevColors => ({
          ...prevColors,
          [repo.id]: fallbackGradients[index],
        }));
      }
    };

    // Process repos in sequence to avoid overwhelming the browser
    const processReposSequentially = async () => {
      for (const repo of repos) {
        await extractColors(repo);
      }
    };

    processReposSequentially();

    // Cleanup
    return () => {
      fac.destroy();
    };
  }, [repos]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 p-4">
      Error: {error}
    </div>
  );

  return (
    <section id="projects" className="px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-white text-4xl font-bold mb-1">
          My Projects<span style={{ color: "#63D471" }}>.</span>
        </h2>
        <p className="text-center text-amber-50 text-l mb-12">Turning ideas into reality with these projects that showcase my skills, innovation, and problem-solving approach.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full h-72 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                {/* Base state */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                  style={{
                    backgroundImage: `url(https://raw.githubusercontent.com/gowri-malla216/${repo.name}/main/public/portfolio-cover.jpeg), url(/Projects/default-cover.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: '0px 0px 15px rgba(0, 255, 102, 0.3)',
                  }}
                />

                {/* Hover state with extracted colors */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: colors[repo.id] || 'linear-gradient(135deg, #1a1a1a, #2a2a2a)'
                  }}
                />


                {/* Repository Name and Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-10 duration-500 group-hover:opacity-0">
                  {repo.topics && (
                    repo.topics.map((topic) => (
                      <span className="inline-block px-3 py-1 text-sm text-white bg-black/50 rounded-full mb-1 mr-0.5">
                        {topic.replaceAll("-", " ")}
                      </span>
                    ))
                  )}

                  <h3 className="text-white font-bold text-xl mb-0">
                    {repo.name.replaceAll("-", " ")}
                  </h3>
                </div>

                {/* Description Overlay */}
                <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <p
                    className="text-md font-bold text-justify"
                    style={{
                      color: textColors[repo.id] || 'white'
                    }}
                  >
                    {repo.description || "No description available."}
                  </p>
                </div>
              </a>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;