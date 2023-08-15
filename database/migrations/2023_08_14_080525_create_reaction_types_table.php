<?php

use App\Models\ReactionType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reaction_types', function (Blueprint $table) {
            $table->uuid('id')->unique()->primary();
            $table->string('name')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reaction_types');
    }

    /**
     * Seed reaction types
     */
    public function seed()
    {
        $types = ReactionType::REACTION_TYPES;
        foreach ($types as $keys => $type) {
            ReactionType::create([
                'name' => $keys,
            ]);
        }
    }
};
