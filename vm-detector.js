(function () {
  function getGLInfo() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return { renderer: null, vendor: null };
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      if (!dbg) return { renderer: null, vendor: null };
      return {
        renderer: gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL),
        vendor: gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL)
      };
    } catch (e) {
      return { renderer: null, vendor: null };
    }
  }

  const VM_SIGNATURES = [
    'vmware', 'virtualbox', 'vbox', 'parallels',
    'llvmpipe', 'swiftshader', 'microsoft basic render',
    'qemu', 'virtio', 'basic display'
  ];

  function checkRenderer(str) {
    if (!str) return false;
    const s = str.toLowerCase();
    return VM_SIGNATURES.some(sig => s.includes(sig));
  }

  function detect() {
    const gl = getGLInfo();
    const rendererFlag = checkRenderer(gl.renderer);
    const vendorFlag = checkRenderer(gl.vendor);
    const webdriverFlag = navigator.webdriver === true;

    const flagged = rendererFlag || vendorFlag;

    return {
      flagged,
      signals: {
        'WebGL renderer': { value: gl.renderer || '(unavailable)', flagged: rendererFlag },
        'WebGL vendor': { value: gl.vendor || '(unavailable)', flagged: vendorFlag },
        'navigator.webdriver': { value: String(navigator.webdriver), flagged: webdriverFlag },
        'hardwareConcurrency (info only)': { value: String(navigator.hardwareConcurrency), flagged: false },
        'platform': { value: navigator.platform || '(unavailable)', flagged: false }
      }
    };
  }

  function render(result) {
    const statusEl = document.getElementById('status');
    const contentEl = document.getElementById('content');
    const debugEl = document.getElementById('debug-body');

    if (result.flagged) {
      statusEl.className = 'status blocked';
      statusEl.textContent = '⛔ Virtual machine detected — access blocked.';
      contentEl.style.display = 'none';
    } else {
      statusEl.className = 'status ok';
      statusEl.textContent = '✅ Environment check passed.';
      contentEl.style.display = 'block';
    }

    let rows = '';
    for (const [label, info] of Object.entries(result.signals)) {
      const cls = info.flagged ? 'sig-flag' : 'sig-clear';
      rows += `<div class="sig-row"><span>${label}</span><span class="${cls}">${info.value}</span></div>`;
    }
    debugEl.innerHTML = rows;
  }

  setTimeout(() => render(detect()), 600);
})();
