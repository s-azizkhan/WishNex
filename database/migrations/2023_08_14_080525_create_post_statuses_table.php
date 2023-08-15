<?php

use App\Models\PostStatus;
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
        Schema::create('post_statuses', function (Blueprint $table) {
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
        Schema::dropIfExists('post_statuses');
    }

    /**
     * Seed post statuses
     */
    public function seed()
    {
        $types = PostStatus::POST_STATUS_TYPES;
        foreach ($types as $keys => $type) {
            PostStatus::create([
                'name' => $keys,
            ]);
        }
    }
};
