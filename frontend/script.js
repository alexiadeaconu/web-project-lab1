// STEP 1 - Form validation

document.querySelector("#skill-form").addEventListener("submit", e => {
    e.preventDefault();

    const input = document.querySelector("#skill");
    const error = document.querySelector("#skill-error");
    const value = input.value.trim();

    if (value.length < 2) {
        error.textContent = "Skill must have at least 2 characters.";
        return;
    }

    error.textContent = "";

    const skill = document.createElement("span");
    skill.textContent = value;

    document.querySelector("#skills").appendChild(skill);
    input.value = "";
});


// STEP 2 - Open Library API

document.querySelector("#search-form").addEventListener("submit", async e => {
    e.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const results = document.querySelector("#results");
    const loading = document.querySelector("#loading");
    const error = document.querySelector("#error");

    results.innerHTML = "";
    error.textContent = "";

    if (!title) {
        error.textContent = "Enter a book title.";
        return;
    }

    loading.textContent = "Loading...";

    try {
        const response = await fetch(
            `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=9`
        );

        if (!response.ok)
            throw new Error("API error");

        const data = await response.json();

        if (data.docs.length === 0) {
            error.textContent = "No books found.";
            return;
        }

        data.docs.forEach(book => {
            const div = document.createElement("div");
            div.className = "book";

            div.innerHTML = `
                <h3>${book.title || "Unknown"}</h3>
                <p>${book.author_name?.[0] || "Unknown author"}</p>
                <p>${book.first_publish_year || "Unknown year"}</p>
            `;

            const button = document.createElement("button");
            button.textContent = "Save";

            button.onclick = async () => {
                try {
                    const response = await fetch(
                        "http://127.0.0.1:5000/api/books",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                title: book.title || "Unknown",
                                author: book.author_name?.[0] || "Unknown",
                                year: book.first_publish_year || null
                            })
                        }
                    );

                    if (!response.ok)
                        throw new Error("Could not save book");

                    alert("Book saved!");
                    loadSavedBooks();

                } catch {
                    alert("Could not save book.");
                }
            };

            div.appendChild(button);
            results.appendChild(div);
        });

    } catch {
        error.textContent = "Could not load books.";
    }

    loading.textContent = "";
});


// STEP 3 - Load saved books from PostgreSQL

async function loadSavedBooks() {
    const container = document.querySelector("#saved-books");

    try {
        const response = await fetch(
            "http://127.0.0.1:5000/api/books"
        );

        if (!response.ok)
            throw new Error("Could not load saved books");

        const books = await response.json();

        container.innerHTML = "";

        if (books.length === 0) {
            container.innerHTML = "<p>No saved books yet.</p>";
            return;
        }

        books.forEach(book => {
            const div = document.createElement("div");
            div.className = "book";

            div.innerHTML = `
                <h3>${book.title}</h3>
                <p>${book.author || "Unknown author"}</p>
                <p>${book.year || "Unknown year"}</p>
            `;

            container.appendChild(div);
        });

    } catch {
        container.innerHTML = "<p>Could not load saved books.</p>";
    }
}


// Load saved books when the page opens

loadSavedBooks();