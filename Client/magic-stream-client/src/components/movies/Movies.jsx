import Movie from "../movie/Movie";

const Movies = ({ movies, updateMovieReview, message }) => {
    const hasMovies = Array.isArray(movies) && movies.length > 0;

    return (
        <div className="ms-netflix" style={styles.page}>
            {/* CSS overrides to neutralize Bootstrap "col-*" + fixed card width inside <Movie/> */}
            <style>{cssOverrides}</style>

            <div style={styles.wrap}>
                <header style={styles.header}>
                    <div style={styles.brandRow}>
                        <span style={styles.brandDot} />
                        <h1 style={styles.title}>JULES'MAGIC MOVIES STREAM </h1>
                    </div>
                    <p style={styles.subtitle}>
                        Rwanda’s Netflix for local cinema — stream powerful stories with a
                        dark, premium experience.
                    </p>
                </header>

                {hasMovies ? (
                    <div style={styles.grid}>
                        {movies.map((movie) => (
                            <div key={movie._id} style={styles.gridItem}>
                                <div style={styles.card}>
                                    <Movie
                                        updateMovieReview={updateMovieReview}
                                        movie={movie}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={styles.emptyState}>
                        <h2 style={styles.emptyTitle}>{message || "No movies available"}</h2>
                        <p style={styles.emptyHint}>Refresh once the backend is running.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: "100vh",
        background:
            "radial-gradient(1200px 600px at 15% 0%, rgba(229,9,20,0.22), transparent 55%), #0b0b0f",
        color: "#fff",
        padding: "28px 18px 60px",
    },
    wrap: {
        maxWidth: "1400px", // wider so it feels Netflix-like
        margin: "0 auto",
    },
    header: {
        marginBottom: 22,
        paddingBottom: 18,
        borderBottom: "1px solid rgba(255,255,255,0.10)",
    },
    brandRow: {
        display: "flex",
        alignItems: "center",
        gap: 10,
    },
    brandDot: {
        width: 10,
        height: 10,
        borderRadius: 999,
        backgroundColor: "#e50914",
        boxShadow: "0 0 18px rgba(229,9,20,0.55)",
        display: "inline-block",
    },
    title: {
        margin: 0,
        fontSize: "2.6rem",
        fontWeight: 900,
        letterSpacing: 1,
        color: "#e50914",
    },
    subtitle: {
        margin: "10px 0 0",
        color: "rgba(255,255,255,0.78)",
        fontSize: "1.05rem",
        lineHeight: 1.55,
        maxWidth: 900,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", // wider cards
        gap: 18,
    },
    gridItem: {
        minWidth: 0,
    },
    card: {
        background: "#141414",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 14px 50px rgba(0,0,0,0.55)",
        transition: "transform 180ms ease, box-shadow 180ms ease",
    },
    emptyState: {
        marginTop: 28,
        padding: 22,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.04)",
    },
    emptyTitle: {
        margin: 0,
        fontSize: "1.4rem",
        color: "rgba(255,255,255,0.9)",
    },
    emptyHint: {
        margin: "10px 0 0",
        color: "rgba(255,255,255,0.65)",
    },
};

const cssOverrides = `
/* 1) Kill Bootstrap grid sizing INSIDE Movie cards */
.ms-netflix .row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.ms-netflix [class^="col-"],
.ms-netflix [class*=" col-"] {
  flex: 0 0 100% !important;
  max-width: 100% !important;
  width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* 2) Force any Bootstrap card inside Movie to be full-width and dark */
.ms-netflix .card {
  width: 100% !important;
  max-width: 100% !important;
  background: #141414 !important;
  color: #fff !important;
  border: none !important;
}
.ms-netflix .card-body,
.ms-netflix .card-footer {
  background: #141414 !important;
  color: #fff !important;
}

/* 3) Make images fill the card nicely */
.ms-netflix img {
  width: 100% !important;
  height: auto !important;
  display: block !important;
}

/* 4) Optional: make links/buttons look more Netflix-ish */
.ms-netflix a { color: #fff; }
.ms-netflix .btn, .ms-netflix button {
  border-radius: 10px !important;
}
`;

export default Movies;
