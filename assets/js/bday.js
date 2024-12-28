window.addEventListener('load', () => {
    const paragraphs = [
        "Happy birthday!!!",
        "说说我为什么喜欢双老师",
        "除了众所周知的超级会照顾人和为他人着想以外，我更喜欢双老师的——",
        "正直 真诚 真实 <br>有活力 有热情 感情细腻<br>有好奇心 对世界有探索欲<br>喜欢交朋友 善于共情 对世界友善<br>Reasonable 乐于沟通 交流有深度<br>上进 愿意拼搏 内核强 情绪稳定",
        "除此之外，还有——",
        "相处起来很舒服很轻松很快乐<br>有幽默感 很皮 能接住谢老师的梗<br>爱撒撒米 对撒撒米好<br>很会安排旅行 会和我一起开车<br>生日和跨年是同一天<br>……",
        "双老师的一切特质，包括不爱吃蘑菇，就是双老师最独特的魅力。",
        "祝双老师生日和新年快乐，在新的一岁新的一年里：<br>继续做自己，坚持自己的价值，<br>做能量高的事情建立自信，勇敢探索和挑战，一起继续体验这个世界！"
    ];

    const textContainer = document.getElementById("text-container");
    const replayButton = document.getElementById("replay");

    let currentIndex = 0;

    const showNextParagraph = () => {
        if (currentIndex < paragraphs.length) {
            // Calculate duration based on paragraph length
            const paragraph = paragraphs[currentIndex];
            const displayDuration = Math.max(2, paragraph.length / 10); // Minimum 2 seconds

            // Clear previous text and add new paragraph
            textContainer.innerHTML = `<p>${paragraph}</p>`;
            const currentParagraph = textContainer.querySelector("p");

            // Animate paragraph fade-in and fade-out using GSAP
            gsap.fromTo(
                currentParagraph,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    onComplete: () => {
                        setTimeout(() => {
                            gsap.to(currentParagraph, {
                                opacity: 0,
                                y: -20,
                                duration: 1,
                                onComplete: () => {
                                    currentIndex++;
                                    showNextParagraph();
                                }
                            });
                        }, displayDuration * 1000); // Display duration in milliseconds
                    }
                }
            );
        } else {
            // Show replay button after all paragraphs
            replayButton.style.display = "block";
        }
    };

    // Start animation
    showNextParagraph();

    // Replay button functionality
    replayButton.addEventListener("click", () => {
        textContainer.innerHTML = "";
        replayButton.style.display = "none";
        currentIndex = 0;
        showNextParagraph();
    });
});
