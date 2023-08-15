<?php

use App\Models\VisibilityType;
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
        Schema::create('visibility_types', function (Blueprint $table) {
            $table->uuid('id')->unique()->primary();
            $table->string('name')->unique();
            $table->timestamps();
        });

        $this->seed();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visibility_types');
    }

    /**
     * Seed visibility types
     */
    public function seed()
    {
        $types = VisibilityType::VISIBILITY_TYPES;
        foreach ($types as $keys => $type) {
            VisibilityType::create([
                'name' => $keys,
            ]);
        }
    }
};
