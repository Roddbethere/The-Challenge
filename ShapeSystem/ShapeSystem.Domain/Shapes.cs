// FILE: ShapeSystem.Domain/Shapes.cs
// LAYER: Domain — pure math, zero I/O

using System;

namespace ShapeSystem.Domain
{
    // The abstract base that every shape must inherit from.
    // "abstract" means you can never do: new Shape() — only new Circle(), etc.
    public abstract class Shape
    {
        public abstract string ShapeType { get; }
        public abstract double CalculateArea();

        public override string ToString() =>
            $"{ShapeType}: area = {CalculateArea():F4}";
    }

    public class Circle : Shape
    {
        public double Radius { get; }

        public Circle(double radius)
        {
            // Protect the invariant: radius can never be zero or negative
            if (radius <= 0)
                throw new ArgumentException("Radius must be greater than zero.", nameof(radius));
            Radius = radius;
        }

        public override string ShapeType => "Circle";
        public override double CalculateArea() => Math.PI * Radius * Radius;
    }

    public class Rectangle : Shape
    {
        public double Width { get; }
        public double Height { get; }

        public Rectangle(double width, double height)
        {
            if (width <= 0) throw new ArgumentException("Width must be > 0.", nameof(width));
            if (height <= 0) throw new ArgumentException("Height must be > 0.", nameof(height));
            Width = width;
            Height = height;
        }

        public override string ShapeType => "Rectangle";
        public override double CalculateArea() => Width * Height;
    }

    public class Triangle : Shape
    {
        public double Base { get; }
        public double Height { get; }

        public Triangle(double @base, double height)
        {
            if (@base <= 0) throw new ArgumentException("Base must be > 0.", nameof(@base));
            if (height <= 0) throw new ArgumentException("Height must be > 0.", nameof(height));
            Base = @base;
            Height = height;
        }

        public override string ShapeType => "Triangle";
        public override double CalculateArea() => 0.5 * Base * Height;
    }

    // NEW SHAPE = just add a new class here. Nothing else in the project changes.
    public class Hexagon : Shape
    {
        public double SideLength { get; }

        public Hexagon(double sideLength)
        {
            if (sideLength <= 0)
                throw new ArgumentException("Side length must be > 0.", nameof(sideLength));
            SideLength = sideLength;
        }

        public override string ShapeType => "Hexagon";
        public override double CalculateArea() =>
            (3 * Math.Sqrt(3) / 2) * SideLength * SideLength;
    }
}