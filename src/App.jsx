import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { createEvent, supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { SolidMarkdown } from 'solid-markdown';

function App() {
  // Signals
  const [topic, setTopic] = createSignal('');
  const [generatedArticle, setGeneratedArticle] = createSignal('');
  const [generatedImage, setGeneratedImage] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');

  // Check if user is signed in
  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener.data.unsubscribe();
    };
  });

  // Handle sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  // Handle generate blog post
  const handleGenerateBlogPost = async () => {
    if (!topic()) return;
    setLoading(true);

    try {
      const articleResult = await createEvent('chatgpt_request', {
        prompt: `Write a detailed blog article on the topic: "${topic()}". Format the response in markdown.`,
        response_type: 'text'
      });
      setGeneratedArticle(articleResult);

      const imageResult = await createEvent('generate_image', {
        prompt: `An illustrative image for a blog article on "${topic()}".`
      });
      setGeneratedImage(imageResult);
    } catch (error) {
      console.error('Error generating blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="flex items-center justify-center h-full">
            <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
              <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">Sign in with ZAPT</h2>
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline mb-6 block text-center"
              >
                Learn more about ZAPT
              </a>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'facebook', 'apple']}
                magicLink={true}
                view="magic_link"
                showLinks={false}
                authView="magic_link"
              />
            </div>
          </div>
        }
      >
        <div class="max-w-6xl mx-auto h-full flex flex-col">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-bold text-purple-600">New App</h1>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 class="text-2xl font-bold mb-4 text-purple-600">Generate Blog Post</h2>
            <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                placeholder="Enter a topic..."
                value={topic()}
                onInput={(e) => setTopic(e.target.value)}
                class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
              />
              <button
                onClick={handleGenerateBlogPost}
                class={`px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading()}
              >
                <Show when={loading()} fallback="Generate Blog Post">
                  Generating...
                </Show>
              </button>
            </div>
          </div>

          <Show when={generatedArticle()}>
            <div class="bg-white p-6 rounded-lg shadow-md mb-8 flex-1 overflow-auto">
              <h2 class="text-2xl font-bold mb-4 text-purple-600">Generated Blog Post</h2>
              <SolidMarkdown children={generatedArticle()} />
            </div>
          </Show>

          <Show when={generatedImage()}>
            <div class="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 class="text-2xl font-bold mb-4 text-purple-600">Generated Image</h2>
              <img src={generatedImage()} alt="Generated" class="w-full rounded-lg shadow-md" />
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}

export default App;