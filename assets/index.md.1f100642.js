import{_ as s,o as t,c as o,Q as e}from"./chunks/framework.df8d1972.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"index.md","filePath":"index.md"}'),a={name:"index.md"},n=e(`<h2 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h2><dl><dt><a href="#nwbuild">nwbuild(options)</a> ⇒ <code>Promise.&lt;undefined&gt;</code></dt><dd><p>Installation Guide</p><p>Every NW.js release includes a modified Node.js binary at a specific version. It is recommended to <a href="https://nodejs.org/en/download/package-manager">install</a> exactly that version on the host system. Not doing so may download ABI incompatible Node modules. Consult the NW.js <a href="https://nwjs.io/versions">versions manifest</a> for what Node.js version to install. It is recommended to use a Node version manager (such as <a href="https://volta.sh">volta</a>, n, nvm, or nvm-windows) to be able to easily install and switch between Node versions.</p><p>Please refer to the examples below for basic usage.</p></dd></dl><h2 id="typedefs" tabindex="-1">Typedefs <a class="header-anchor" href="#typedefs" aria-label="Permalink to &quot;Typedefs&quot;">​</a></h2><dl><dt><a href="#Options">Options</a> : <code>object</code></dt><dd><p>Configuration options</p></dd></dl><p><a name="nwbuild"></a></p><h2 id="nwbuild-options-⇒-promise-undefined" tabindex="-1">nwbuild(options) ⇒ <code>Promise.&lt;undefined&gt;</code> <a class="header-anchor" href="#nwbuild-options-⇒-promise-undefined" aria-label="Permalink to &quot;nwbuild(options) ⇒ &lt;code&gt;Promise.&amp;lt;undefined&amp;gt;&lt;/code&gt;&quot;">​</a></h2><p>Installation Guide</p><p>Every NW.js release includes a modified Node.js binary at a specific version. It is recommended to <a href="https://nodejs.org/en/download/package-manager" target="_blank" rel="noreferrer">install</a> exactly that version on the host system. Not doing so may download ABI incompatible Node modules. Consult the NW.js <a href="https://nwjs.io/versions" target="_blank" rel="noreferrer">versions manifest</a> for what Node.js version to install. It is recommended to use a Node version manager (such as <a href="https://volta.sh" target="_blank" rel="noreferrer">volta</a>, n, nvm, or nvm-windows) to be able to easily install and switch between Node versions.</p><p>Please refer to the examples below for basic usage.</p><p><strong>Kind</strong>: global function</p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>options</td><td><a href="#Options"><code>Options</code></a></td><td>Options</td></tr></tbody></table><p><strong>Example</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// ESM usage:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> nwbuild </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;nw-builder&quot;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// ESM usage:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> nwbuild </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;nw-builder&quot;</span><span style="color:#24292E;">;</span></span></code></pre></div><p><strong>Example</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// CJS usage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> nwbuild </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">nwbuild </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;nw-builder&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;">(error) {</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(error);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">})();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// CJS usage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> nwbuild </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">nwbuild </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;nw-builder&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;">(error) {</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">(error);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">})();</span></span></code></pre></div><p><strong>Example</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Module usage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">nwbuild</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Module usage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">nwbuild</span><span style="color:#24292E;">();</span></span></code></pre></div><p><strong>Example</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// CLI usage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">npx nwbuild</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// CLI usage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">npx nwbuild</span></span></code></pre></div><p><strong>Example</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Node manifest usage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">&quot;nwbuild&quot;</span><span style="color:#E1E4E8;">: {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Node manifest usage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">&quot;nwbuild&quot;</span><span style="color:#24292E;">: {}</span></span></code></pre></div><p><a name="Options"></a></p><h2 id="options-object" tabindex="-1">Options : <code>object</code> <a class="header-anchor" href="#options-object" aria-label="Permalink to &quot;Options : &lt;code&gt;object&lt;/code&gt;&quot;">​</a></h2><p>Configuration options</p><p><strong>Kind</strong>: global typedef<br><strong>Properties</strong></p><table><thead><tr><th>Name</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td>[srcDir]</td><td><code>&quot;./&quot;</code> | <code>string</code></td><td><code>&quot;./&quot;</code></td><td>String of space separated glob patterns which correspond to NW app code</td></tr><tr><td>[mode]</td><td><code>&quot;get&quot;</code> | <code>&quot;run&quot;</code> | <code>&quot;build&quot;</code></td><td><code>&quot;build&quot;</code></td><td>Run or build application</td></tr><tr><td>[version]</td><td><code>&quot;latest&quot;</code> | <code>&quot;stable&quot;</code> | <code>string</code></td><td><code>&quot;latest&quot;</code></td><td>NW runtime version</td></tr><tr><td>[flavor]</td><td><code>&quot;normal&quot;</code> | <code>&quot;sdk&quot;</code></td><td><code>&quot;normal&quot;</code></td><td>NW runtime build flavor</td></tr><tr><td>platform</td><td><code>&quot;linux&quot;</code> | <code>&quot;osx&quot;</code> | <code>&quot;win&quot;</code></td><td></td><td>NW supported platforms</td></tr><tr><td>arch</td><td><code>&quot;ia32&quot;</code> | <code>&quot;x64&quot;</code> | <code>&quot;arm64&quot;</code></td><td></td><td>NW supported architectures</td></tr><tr><td>[outDir]</td><td><code>&quot;./out&quot;</code> | <code>string</code></td><td><code>&quot;./out&quot;</code></td><td>Directory to store build artifacts</td></tr><tr><td>[cacheDir]</td><td><code>&quot;./cache&quot;</code> | <code>string</code></td><td><code>&quot;./cache&quot;</code></td><td>Directory to store NW binaries</td></tr><tr><td>[downloadUrl]</td><td><code>&quot;<a href="https://dl.nwjs.io" target="_blank" rel="noreferrer">https://dl.nwjs.io</a>&quot;</code> | <code>string</code></td><td><code>&quot;<a href="https://dl.nwjs.io" target="_blank" rel="noreferrer">https://dl.nwjs.io</a>&quot;</code></td><td>URI to download NW binaries from</td></tr><tr><td>[manifestUrl]</td><td><code>&quot;<a href="https://nwjs.io/versions&amp;quot;" target="_blank" rel="noreferrer">https://nwjs.io/versions&amp;quot;</a></code> | <code>string</code></td><td><code>&quot;<a href="https://nwjs.io/versions&amp;quot;" target="_blank" rel="noreferrer">https://nwjs.io/versions&amp;quot;</a></code></td><td>URI to download manifest from</td></tr><tr><td>app</td><td><code>object</code></td><td></td><td>Refer to Linux/Windows Specific Options under Getting Started in the docs</td></tr><tr><td>[cache]</td><td><code>boolean</code></td><td><code>true</code></td><td>If true the existing cache is used. Otherwise it removes and redownloads it.</td></tr><tr><td>[zip]</td><td><code>boolean</code> | <code>&quot;zip&quot;</code> | <code>&quot;tar&quot;</code> | <code>&quot;tgz&quot;</code></td><td><code>false</code></td><td>If true, &quot;zip&quot;, &quot;tar&quot; or &quot;tgz&quot; the outDir directory is compressed.</td></tr><tr><td>[cli]</td><td><code>boolean</code></td><td><code>false</code></td><td>If true the CLI is used to glob srcDir and parse other options</td></tr><tr><td>[ffmpeg]</td><td><code>boolean</code></td><td><code>false</code></td><td>If true the chromium ffmpeg is replaced by community version</td></tr><tr><td>[glob]</td><td><code>boolean</code></td><td><code>true</code></td><td>If true globbing is enabled</td></tr><tr><td>[logLevel]</td><td><code>&quot;error&quot;</code> | <code>&quot;warn&quot;</code> | <code>&quot;info&quot;</code> | <code>&quot;debug&quot;</code></td><td><code>&quot;info&quot;</code></td><td>Specified log level.</td></tr></tbody></table>`,26),l=[n];function d(p,r,c,i,u,h){return t(),o("div",null,l)}const b=s(a,[["render",d]]);export{g as __pageData,b as default};
