import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SPECIES_ICON = {
  Dog: (
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2 .336-3.5 2-3.5 4 0 .085.002.17.005.253C3.162 8.639 4 10.695 4 13c0 3.314 2.686 6 6 6h4c3.314 0 6-2.686 6-6 0-2.305.838-4.361.995-5.747A4.5 4.5 0 0 0 17.5 3c-1.923-.321-3.5.782-3.5 2.172V8H10V5.172z" />
      <path d="M9 13h.01M15 13h.01" />
    </svg>
  ),
  Cat: (
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5c-1 0-2 .5-2.5 1.5L8 4l-2 3c-.5 1-.5 2 0 3 .3.6.7 1.1 1.2 1.5C7.5 12.6 8 14 8 15c0 2.2 1.8 4 4 4s4-1.8 4-4c0-1-.5-2.4-.8-3.5.5-.4.9-.9 1.2-1.5.5-1 .5-2 0-3L14.5 4 13 6.5C12.5 5.5 12 5 12 5z" />
      <path d="M9.5 13h.01M14.5 13h.01" />
      <path d="M9 17c1 .5 2 .5 3 0" />
    </svg>
  ),
  Bird: (
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 7h.01" />
      <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
      <path d="m20 7 2 .5-2 .5" />
      <path d="M10 18v3" />
      <path d="M14 17.75V21" />
      <path d="M7 18a6 6 0 0 0 3.84-10.61" />
    </svg>
  ),
  Rabbit: (
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 16a3 3 0 0 1 2.24 5H8.76A3 3 0 0 1 11 16h2z" />
      <path d="M6.03 11.3A5 5 0 0 1 8 5.1V3a1 1 0 0 1 2 0v1.22a5 5 0 0 1 4 0V3a1 1 0 0 1 2 0v2.1a5 5 0 0 1 1.97 6.2" />
      <path d="M9 11h.01M15 11h.01" />
    </svg>
  ),
  Other: (
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20a1 1 0 0 0 2 0v-1a1 1 0 0 0-2 0v1z" />
      <ellipse cx="7.5" cy="14.5" rx="2.5" ry="2.5" />
      <ellipse cx="16.5" cy="14.5" rx="2.5" ry="2.5" />
      <ellipse cx="5" cy="9" rx="2" ry="2" />
      <ellipse cx="19" cy="9" rx="2" ry="2" />
      <ellipse cx="12" cy="8" rx="2" ry="2" />
    </svg>
  ),
};

const LocationIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PetCard = ({ pet, index = 0 }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => navigate(`/pets/${pet._id}`);

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        position: "relative",
        transform: hovered
          ? "translateY(-6px) scale(1.02)"
          : "translateY(0) scale(1)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.12)" : "none",
        transition:
          "transform 0.32s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.32s ease",
        zIndex: hovered ? 2 : 1,
      }}
    >
      {/* Image Box */}
      <div
        style={{
          height: 220,
          overflow: "hidden",
          position: "relative",
          background: "var(--surface2)",
        }}
      >
        {/* Image or Placeholder — zoom wrapper */}
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          {pet.imageURL ? (
            <img
              src={pet.imageURL}
              alt={pet.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text3)",
                opacity: 0.15,
              }}
            >
              {SPECIES_ICON[pet.species] || SPECIES_ICON.Other}
            </div>
          )}
        </div>

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />

        {/* Status badge */}
        <span
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            fontSize: 10,
            letterSpacing: "0.04em",
            padding: "3px 10px",
            borderRadius: 20,
            fontWeight: 500,
            background:
              pet.status === "available"
                ? "rgba(234,243,222,0.92)"
                : "rgba(250,238,218,0.92)",
            color: pet.status === "available" ? "#3b6d11" : "#854f0b",
          }}
        >
          {pet.status === "available" ? "Available" : "Adopted"}
        </span>

        {/* View details button — slides up on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          style={{
            position: "absolute",
            bottom: 14,
            left: "50%",
            transform: hovered
              ? "translateX(-50%) translateY(0)"
              : "translateX(-50%) translateY(6px)",
            fontSize: 11,
            fontWeight: 500,
            padding: "6px 18px",
            borderRadius: 20,
            background: "var(--surface)",
            color: "var(--text)",
            border: "none",
            cursor: "pointer",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.25s ease 0.05s, transform 0.28s ease",
            whiteSpace: "nowrap",
            fontFamily: "inherit",
          }}
        >
          View details →
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "15px 16px 16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 2,
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 17,
              fontWeight: 700,
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            {pet.name}
          </span>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 14,
              fontWeight: 700,
              color: "var(--text)",
            }}
          >
            ৳{pet.adoptionFee?.toLocaleString() || 0}
          </span>
        </div>

        <p
          style={{
            fontSize: 11,
            color: "var(--text3)",
            marginBottom: 13,
            lineHeight: 1.5,
          }}
        >
          {[pet.breed, pet.age, pet.gender].filter(Boolean).join(" · ")}
        </p>

        <div
          style={{ height: 1, background: "var(--border)", marginBottom: 11 }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "var(--text3)",
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <LocationIcon /> {pet.location}
          </span>
          {pet.species && (
            <span
              style={{
                fontSize: 10,
                color: "var(--text2)",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                padding: "2px 9px",
                borderRadius: 10,
              }}
            >
              {pet.species}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
