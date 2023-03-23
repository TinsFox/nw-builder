import{_ as s,c as a,o as e,N as n}from"./chunks/framework.cd9250a1.js";const u=JSON.parse('{"title":"Installation Guide","description":"","frontmatter":{},"headers":[],"relativePath":"install.md"}'),l={name:"install.md"},o=n(`<h1 id="installation-guide" tabindex="-1">Installation Guide <a class="header-anchor" href="#installation-guide" aria-label="Permalink to &quot;Installation Guide&quot;">​</a></h1><p>Every NW.js release includes a modified Node.js at a specific version. Native Node modules are not compatible with the NW.js ABI. To prevent this scenario, <code>nw-builder</code> requires the host Node version to be identical to NW.js&#39;s Node version. It is recommended to use a <a href="https://nodejs.org/en/download/package-manager" target="_blank" rel="noreferrer">Node Version Manager</a> to manage multiple Node installations. Consult the <a href="https://nwjs.io/versions" target="_blank" rel="noreferrer">manifest</a> for what Node version to install.</p><p>With the environment setup, install <code>nw-builder</code> using npm:</p><p>Using npm:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nw-builder</span></span>
<span class="line"></span></code></pre></div><blockquote><p>Note: We install as a dev dependency to prevent it from being packaged with your application code.</p></blockquote><p>You may use alternate package managers:</p><p>Enable <code>corepack</code> if your Node version is above <code>v14.19.0</code> or <code>v16.9.0</code>:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">corepack</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">enable</span></span>
<span class="line"></span></code></pre></div><p>You may install it via npm if your version does not match:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">corepack</span></span>
<span class="line"></span></code></pre></div><p>Prepare yarn:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">corepack prepare yarn@x.y.z --activate</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Using yarn:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nw-builder</span></span>
<span class="line"></span></code></pre></div><p>Prepare yarn:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">corepack prepare pnpm@x.y.z --activate</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Using pnpm:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nw-builder</span></span>
<span class="line"></span></code></pre></div><p>For more information, refer to the official <a href="https://nodejs.org/api/corepack.html" target="_blank" rel="noreferrer">corepack documentation</a>.</p>`,20),p=[o];function t(c,r,i,d,C,y){return e(),a("div",null,p)}const m=s(l,[["render",t]]);export{u as __pageData,m as default};
