@extends('layouts.app')

@section('title', 'Task 2')

@section('content')

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <span class="text-xs font-bold text-indigo-500 uppercase tracking-widest">ucwords() &
                strtolower()</span>
            <h3 class="text-lg font-bold mt-1">Name Cleanup</h3>
            <div class="mt-4 space-y-2">
                <p class="text-sm text-slate-400 italic">Raw: {{ $name['raw'] }}</p>
                <p class="text-xl font-semibold text-slate-800">Clean: {{ $name['clean'] }}</p>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <span class="text-xs font-bold text-emerald-500 uppercase tracking-widest">str_replace() &
                strtolower()</span>
            <h3 class="text-lg font-bold mt-1">URL Slug Generator</h3>
            <div class="mt-4">
                <p class="text-sm text-slate-600 mb-1 line-clamp-1">{{ $slug['title'] }}</p>
                <code class="text-xs bg-blue-50 text-blue-700 p-2 rounded block border border-blue-100 hover:underline">
                    /blog/{{ $slug['slug'] }}
                    </code>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <span class="text-xs font-bold text-orange-500 uppercase tracking-widest">explode()</span>
            <h3 class="text-lg font-bold mt-1">Username Creation</h3>
            <div class="mt-4 flex items-center gap-4">
                <div
                    class="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    {{ substr($user['full'], 0, 1) }}
                </div>
                <div>
                    <p class="text-sm font-bold text-slate-800">{{ $user['full'] }}</p>
                    <p class="text-xs text-orange-500">@ {{ $user['username'] }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <span class="text-xs font-bold text-orange-500 uppercase tracking-widest">implode()</span>
            <h3 class="text-lg font-bold mt-1">Array Items Joined</h3>
            <p class="mt-2 text-lg font-mono tracking-tighter">{{ $skills }}</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <span class="text-xs font-bold text-blue-500 uppercase tracking-widest">strlen()</span>
            <h3 class="text-lg font-bold mt-1">Bio Analytics</h3>
            <div class="mt-4">
                <p class="text-sm text-slate-600 italic mb-2">"{{ $bio['text'] }}"</p>
                <p class="text-xs font-bold text-slate-400">LENGTH: <span class="text-blue-600">{{ $bio['count'] }}
                        chars</span></p>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <span class="text-xs font-bold text-rose-500 uppercase tracking-widest">substr()</span>
            <h3 class="text-lg font-bold mt-1">Excerpt Extraction</h3>
            <div class="mt-4 space-y-4">
                <div>
                    <p class="text-xs font-bold text-slate-400 mb-1 uppercase">Original Desc</p>
                    <p class="text-xs text-slate-500">{{ $description['long'] }}</p>
                </div>
                <div>
                    <p class="text-xs font-bold text-rose-400 mb-1 uppercase">Short Desc (50 chars)</p>
                    <p class="text-sm text-slate-800 font-medium">{{ $description['short'] }}</p>
                </div>
            </div>
        </div>

    </div>

@endsection

@section('pages')
    <a href="/task4" class="text-slate-400 hover:text-slate-600 text-sm">Back to Task 4</a>
    <a href="/dashboard" class="text-slate-400 hover:text-slate-600 text-sm">Proceed to Dashboard</a>
@endsection