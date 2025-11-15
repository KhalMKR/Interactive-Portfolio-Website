(function () {
    'use strict';

    const messages = {
        copyEmail: 'Email copied',
        copyStudentEmail: 'Student email copied',
        copyNo: 'Phone number copied'
    };

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(ta);
            return Promise.resolve();
        } catch (err) {
            document.body.removeChild(ta);
            return Promise.reject(err);
        }
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }
        return fallbackCopy(text);
    }

    function showToast(message, ms = 1800) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        }, ms);
    }

    function attachHandlers() {
        ['copyEmail', 'copyStudentEmail', 'copyNo'].forEach(id => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.addEventListener('click', () => {
                const text = btn.textContent.trim();
                if (!text) {
                    showToast('Nothing to copy');
                    return;
                }
                copyToClipboard(text)
                    .then(() => showToast(messages[id] || 'Copied'))
                    .catch(() => showToast('Unable to copy'));
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachHandlers);
    } else {
        attachHandlers();
    }
})();