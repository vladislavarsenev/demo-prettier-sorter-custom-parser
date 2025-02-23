#!/usr/bin/env node
// @ts-nocheck

/// <reference types="node" />
/// <reference lib="es2015" />
// Imports at the top
import axios from 'axios';

/**
 * test
 */
const a = 1;
// test comment
/**
 * test
 */
import { useState, useEffect } from 'react' with { type: 'module' };
import type { FC, ReactNode } from 'react';

// Basic Types
let isDone: boolean = false;
let decimal: number = 6;
let color: string = 'blue';
let list: number[] = [1, 2, 3];
let x: [string, number] = ['hello', 10]; // Tuple

// Enums
enum Color {
	Red,
	Green,
	Blue,
}
let c: Color = Color.Green;

// Any
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false; // okay, definitely a boolean

// Void
function warnUser(): void {
	console.log('This is my warning message');
}

// Null and Undefined
let u: undefined = undefined;
let n: null = null;

// Never
function error(message: string): never {
	throw new Error(message);
}

function fail() {
	return error('Something failed');
}

function infiniteLoop(): never {
	while (true) {}
}

// Object
declare function create(o: object | null): void;
create({ prop: 0 });
create(null);

// Type assertions
let someValue: any = 'this is a string';
let strLength: number = (someValue as string).length;

// Interfaces
interface LabelledValue {
	label: string;
}

function printLabel(labelledObj: LabelledValue) {
	console.log(labelledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);

// Classes
class Greeter {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}
	greet() {
		return 'Hello, ' + this.greeting;
	}
}

let greeter = new Greeter('world');

// Inheritance
class Animal {
	move(distanceInMeters: number = 0) {
		console.log(`Animal moved ${distanceInMeters}m.`);
	}
}

class Dog extends Animal {
	bark() {
		console.log('Woof! Woof!');
	}
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

// Generics
function identity<T>(arg: T): T {
	return arg;
}

let output = identity<string>('myString');

// Enums
enum Direction {
	Up = 1,
	Down,
	Left,
	Right,
}

// Type Inference
let inferredString = 'This is a string';

// Type Compatibility
interface Named {
	name: string;
}

let x1: Named;
let y = { name: 'Alice', location: 'Seattle' };
x1 = y;

// Advanced Types
type NameOrNameArray = string | string[];
type NameResolver = () => string;
type NameOrResolver = NameOrNameArray | NameResolver;

function getName(n: NameOrResolver): string {
	if (typeof n === 'string') {
		return n;
	} else if (Array.isArray(n)) {
		return n.join(', ');
	} else {
		return n();
	}
}

// Symbols
let sym1 = Symbol();
let sym2 = Symbol('key');

let obj = {
	[sym1]: 'value',
};

console.log(obj[sym1]);

// Iterators and Generators
let someArray = [1, 'string', false];

for (let entry of someArray) {
	console.log(entry);
}

// Modules
export {
	isDone,
	decimal,
	color,
	list,
	x,
	c,
	notSure,
	warnUser,
	u,
	n,
	error,
	fail,
	infiniteLoop,
	create,
	someValue,
	strLength,
	LabelledValue,
	printLabel,
	myObj,
	Greeter,
	greeter,
	Animal,
	Dog,
	dog,
	identity,
	output,
	Direction,
	inferredString,
	Named,
	x1,
	y,
	NameOrNameArray,
	NameResolver,
	NameOrResolver,
	getName,
	sym1,
	sym2,
	obj,
	someArray,
};

// Namespaces
namespace Validation {
	export interface StringValidator {
		isAcceptable(s: string): boolean;
	}

	const lettersRegexp = /^[A-Za-z]+$/;
	const numberRegexp = /^[0-9]+$/;

	export class LettersOnlyValidator implements StringValidator {
		isAcceptable(s: string) {
			return lettersRegexp.test(s);
		}
	}

	export class ZipCodeValidator implements StringValidator {
		isAcceptable(s: string) {
			return s.length === 5 && numberRegexp.test(s);
		}
	}
}

/**
 * @param strings
 * @type {string[]}
 * @description This is a list of strings
 * @example
 * ```ts
 * let strings = ['Hello', '98052', '101'];
 * ```
 */
let strings = ['Hello', '98052', '101'];

let validators: { [s: string]: Validation.StringValidator } = {};
validators['ZIP code'] = new Validation.ZipCodeValidator();
validators['Letters only'] = new Validation.LettersOnlyValidator();

for (let s of strings) {
	for (let name in validators) {
		let isMatch = validators[name].isAcceptable(s);
		console.log(
			`'${s}' ${isMatch ? 'matches' : 'does not match'} '${name}'.`,
		);
	}
}

// Add declare module feature before the exports
declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*.png' {
	const content: string;
	export default content;
}

declare module '*.json' {
	const content: { [key: string]: any };
	export default content;
}

// Decorators
function classDecorator<T extends { new (...args: any[]): {} }>(
	constructor: T,
) {
	return class extends constructor {
		newProperty = 'new property';
		hello = 'override';
	};
}

function methodDecorator(
	target: Object,
	propertyKey: string | symbol,
	descriptor: TypedPropertyDescriptor<any>,
): TypedPropertyDescriptor<any> | void {
	const originalMethod = descriptor.value;

	descriptor.value = function (...args: any[]) {
		console.log(`Calling ${String(propertyKey)} with args: ${args}`);
		return originalMethod.apply(this, args);
	};

	return descriptor;
}

@classDecorator
class Example {
	property = 'property';

	@methodDecorator
	method() {
		return `method called with ${this.property}`;
	}
}

// Abstract Classes
abstract class Shape {
	abstract getArea(): number;

	printArea() {
		console.log(this.getArea());
	}
}

// Index Signatures
interface StringArray {
	[index: number]: string;
}

// Mapped Types
type Readonly<T> = {
	readonly [P in keyof T]: T[P];
};

// Conditional Types
type TypeName<T> = T extends string
	? 'string'
	: T extends number
		? 'number'
		: 'object';

// Utility Types
interface Todo {
	title: string;
	description: string;
}
type TodoPreview = Pick<Todo, 'title'>;
type PartialTodo = Partial<Todo>;

// Function Overloads
function makeDate(timestamp: number): Date;
function makeDate(year: number, month: number, day: number): Date;
function makeDate(yearOrTimestamp: number, month?: number, day?: number): Date {
	if (month !== undefined && day !== undefined) {
		return new Date(yearOrTimestamp, month - 1, day);
	}
	return new Date(yearOrTimestamp);
}

// Readonly properties
interface Point {
	readonly x: number;
	readonly y: number;
}

// Optional Chaining and Nullish Coalescing
const adventurer = {
	name: 'Alice',
	cat: {
		name: 'string',
	},
};
const catName = adventurer.cat?.name ?? 'no cat';

// Template Literal Types
type EmailLocaleIDs = 'welcome_email' | 'email_heading';
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff';
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

// Intersection Types
interface ErrorHandling {
	success: boolean;
	error?: { message: string };
}
interface ArtworksData {
	artworks: { title: string }[];
}
type ArtworksResponse = ErrorHandling & ArtworksData;

// Type Guards
function isString(value: any): value is string {
	return typeof value === 'string';
}

// Private and Protected Members
class BankAccount {
	private balance: number;
	protected accountNumber: string;

	constructor(initialBalance: number, accountNumber: string) {
		this.balance = initialBalance;
		this.accountNumber = accountNumber;
	}
}

// Static Members
class StaticExample {
	static count = 0;
	static increment() {
		this.count++;
	}
}

// Async/Await
async function fetchData(): Promise<string> {
	const response = await fetch('https://api.example.com/data');
	return response.text();
}
