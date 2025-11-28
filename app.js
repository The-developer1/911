// منصة النخبة - سكريبت التطبيق الرئيسي

// Smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add hover animation for feature cards
const cards = document.querySelectorAll('.feature-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Local Storage للبيانات
const AlNahbaStorage = {
    setUser(user) {
        localStorage.setItem('alnahba_user', JSON.stringify(user));
    },
    getUser() {
        const user = localStorage.getItem('alnahba_user');
        return user ? JSON.parse(user) : null;
    },
    clearUser() {
        localStorage.removeItem('alnahba_user');
    }
};

// نموذج تسجيل الدخول
function handleLogin(email, password) {
    const user = {
        email: email,
        name: email.split('@')[0],
        loginTime: new Date().toISOString()
    };
    AlNahbaStorage.setUser(user);
    console.log('تم تسجيل الدخول:', user);
    return user;
}

// نموذج إنشاء حساب
function handleSignup(name, email, password, major) {
    const user = {
        name: name,
        email: email,
        major: major,
        registrationDate: new Date().toISOString(),
        stats: {
            examsCompleted: 0,
            testsScore: 0,
            libraryAccess: 0,
            forumPosts: 0
        }
    };
    AlNahbaStorage.setUser(user);
    console.log('تم إنشاء حساب:', user);
    return user;
}

// عرض إشعار
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#1DB854' : '#EA4335'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل منصة النخبة بنجاح');
    const user = AlNahbaStorage.getUser();
    if (user) {
        console.log('المستخدم الحالي:', user.name);
    }
});

// تصدير الدوال للاستخدام في صفحات أخرى
window.AlNahbaApp = {
    Storage: AlNahbaStorage,
    handleLogin: handleLogin,
    handleSignup: handleSignup,
    showNotification: showNotification
};
